using Microsoft.AspNetCore.Identity;
using Server.DTO;
using Server.Enums;
using Server.Models;
using Server.Repositories;

namespace Server.Services
{
    public class UserService(IUserRepository userRepository, SlimeService slimeService)
    {
        private IUserRepository UserRepository { get; set; } = userRepository;
        private SlimeService SlimeService { get; set; } = slimeService;
        private PasswordHasher<User> PasswordHasher { get; set; } = new();


        public List<UserUnique> GetUsers()
        {
            return UserRepository.GetAllUnique();
        }

        public User? GetUserById(int id)
        {
            return UserRepository.GetById(id);
        }

        public UserAccount? GetUserAccountById(int id)
        {
            User? user = UserRepository.GetById(id);
            if (user != null)
            {
                List<SlimeDTO> slimes = SlimeService.GetSlimesByOwner(user);
                return new(id, user.Username, user.IsAdmin, user.Gold, slimes, user.Friends);
            }
            return null;
        }

        public List<UserAccount> GetUserAccounts()
        {
            List<UserAccount> userAccounts = [];
            List<User> users = UserRepository.GetAll();
            foreach (var user in users)
            {
                List<SlimeDTO> slimes = SlimeService.GetSlimesByOwner(user);
                userAccounts.Add(new(user.Id, user.Username, user.IsAdmin, user.Gold, slimes, user.Friends));
            }
            return userAccounts;
        }

        public UserAuth? RegisterUser(UserCredentials userAttempt)
        {
            if (!CheckIfUserExists(userAttempt.Username, userAttempt.Email))
            {
                User user = CreateNewUser(userAttempt.Username, userAttempt.Email, userAttempt.Password);
                UserRepository.Add(user);

                for (int i = 0; i < 3; i++)
                {
                    SlimeService.CreateRandomSlime(user.Id);
                }

                return new(new(user.Id, user.Username, user.Email), GenerateToken(user.Id, user.Username));
            }
            return null;
        }

        public bool CheckIfUserExists(string username, string email)
        {
            User? userByUsername = UserRepository.GetByUsername(username);
            User? userByEmail = UserRepository.GetByEmail(email);
            if (userByUsername != null || userByEmail != null)
            {
                return true;
            }
            return false;
        }

        public UserAuth? LoginUser(UserCredentials userAttempt)
        {
            User? user = UserRepository.GetByUsername(userAttempt.Username);
            if (user != null && user.Username == userAttempt.Username)
            {
                PasswordVerificationResult result = PasswordHasher.VerifyHashedPassword(user, user.Password, userAttempt.Password);
                if (result != PasswordVerificationResult.Failed)
                {
                    return new(new(user.Id, user.Username, user.Email), GenerateToken(user.Id, user.Username));
                }
            }
            return null;
        }

        private User CreateNewUser(string username, string email, string password)
        {
            User user = new(username, email, password);

            string hashedPassword = PasswordHasher.HashPassword(user, password);
            user.Password = hashedPassword;

            return user;
        }


        public UserAccount? SpliceSlime(UserAccount userAccount)
        {
            User? user = UserRepository.GetById(userAccount.Id);
            if (user != null)
            {
                var slimeIds = user.OwnedSlimes.Select(s => s.Id).ToHashSet();
                var invalidSlime = userAccount.Slimes.FirstOrDefault(s => !slimeIds.Contains(s.Id));
                if (invalidSlime != null) return null;

                SlimeDTO slime = SlimeService.SpliceSlime(userAccount.Slimes, userAccount.Id);
                List<int> oldSlimeIds = [.. userAccount.Slimes.Select(s => s.Id)];
                userAccount.Slimes = [.. 
                    user.OwnedSlimes
                    .Where(s => !oldSlimeIds.Contains(s.Id))
                    .Select(s => new SlimeDTO(
                            s.Id, s.Name, s.Size, s.Color, s.IsOnMarket, s.Price, s.OwnerId, 
                            s.Owner != null ? s.Owner.Username : "???", s.SlimeStats, s.Svg
                        ))];
            }
            return userAccount;
        }

        public Tuple<Status, SlimeStats?> TrainSlime(SlimeTrainer slimeTrainer)
        {
            Tuple<Status, SlimeStats?> result;
            User? user = UserRepository.GetById(slimeTrainer.OwnerId);
            if (user != null)
            {
                if (user.Gold < slimeTrainer.Cost) return new(Status.NOTENOUGHGOLD, null);
                if (user.Id != slimeTrainer.OwnerId) return new(Status.NOTOWN, null);

                result = SlimeService.TrainSlime(slimeTrainer);

                if (result.Item1 == Status.SUCCESS)
                {
                    user.Gold -= slimeTrainer.Cost;
                    UserRepository.Update(user);
                }

                return result;
            }
            return new(Status.OWNERNOTFOUND, null);
        }

        public Tuple<Status, SlimeStats?> FeedSlime(SlimeFeeder slimeFeeder)
        {
            Tuple<Status, SlimeStats?> result;
            User? user = UserRepository.GetById(slimeFeeder.OwnerId);
            if (user != null)
            {
                if (user.Gold < slimeFeeder.Cost) return new(Status.NOTENOUGHGOLD, null);
                if (user.Id != slimeFeeder.OwnerId) return new(Status.NOTOWN, null);

                result = SlimeService.FeedSlime(slimeFeeder);

                if (result.Item1 == Status.SUCCESS) 
                {
                    user.Gold -= slimeFeeder.Cost;
                    UserRepository.Update(user);
                }

                return result;
            }
            return new(Status.OWNERNOTFOUND, null);
        }

        public bool EarnGold(int id)
        {
            User? user = UserRepository.GetById(id);
            if (user != null)
            {
                user.Gold += 1000;
                UserRepository.Update(user);
                return true;
            }
            return false;
        }

        public bool PurchaseSlime(UserTransaction userTransaction)
        {
            User? buyer = UserRepository.GetById(userTransaction.BuyerId);
            User? seller = UserRepository.GetById(userTransaction.SellerId);
            if (buyer != null && seller != null)
            {
                for(int i = 0; i < seller.OwnedSlimes.Count; i++)
                {
                    int slimeid = seller.OwnedSlimes[i].Id;
                    if (slimeid == userTransaction.SlimeId)
                    {
                        SlimeDTO? slime = SlimeService.GetSlimeById(slimeid);
                        if (slime != null && buyer.Gold >= slime.Price && slime.IsOnMarket)
                        {
                            buyer.Gold -= slime.Price;
                            seller.Gold += slime.Price;

                            UserRepository.Update(buyer);
                            UserRepository.Update(seller);

                            SlimeService.UpdateSlime(new(slime.Id, slime.Name, false, buyer.Id, buyer.Username));

                            return true;
                        }
                        break;
                    }
                }
            }
            return false;
        }

        private static string GenerateToken(int id, string name)
        {
            return id + "fsdbfb2299c" + name + "uhu89h2bdxc89c";
        }
    }
}
