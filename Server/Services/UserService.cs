using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services
{
    public class UserService(IUserRepository userRepository, SlimeService slimeService)
    {
        private IUserRepository UserRepository { get; set; } = userRepository;
        private SlimeService SlimeService { get; set; } = slimeService;


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
                List<Slime> slimes = SlimeService.GetSlimesByOwner(user);
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
                List<Slime> slimes = SlimeService.GetSlimesByOwner(user);
                userAccounts.Add(new(user.Id, user.Username, user.IsAdmin, user.Gold, slimes, user.Friends));
            }
            return userAccounts;
        }

        public UserAuth? RegisterUser(UserCredentials userAttempt)
        {
            if (!CheckIfUserExists(userAttempt.Username, userAttempt.Email))
            {
                User user = CreateNewUser(userAttempt.Username, userAttempt.Email, userAttempt.Password);

                for (int i = 0; i < user.OwnedSlimes.Count; i++)
                {
                    Slime slime = SlimeService.CreateRandomSlime(user.Id);
                    user.OwnedSlimes[i] = slime.Id;
                }

                UserRepository.Add(user);
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
            if (user?.Username == userAttempt.Username && user?.Password == userAttempt.Password)
            {
                return new(new(user.Id, user.Username, user.Email), GenerateToken(user.Id, user.Username));
            }
            return null;
        }

        public User CreateNewUser(string username, string email, string password)
        {
            Random r = new();
            int rInt = r.Next(6);
            int id = UserRepository.GetAll().Count;

            return new(
                id,
                username, email, password,
                [.. Enumerable.Repeat(-1, rInt)]
                );
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
                    int slimeid = seller.OwnedSlimes[i];
                    if (slimeid == userTransaction.SlimeId)
                    {
                        Slime? slime = SlimeService.GetSlimeById(slimeid);
                        if (slime != null && buyer.Gold >= slime.Price && slime.IsOnMarket)
                        {
                            buyer.OwnedSlimes.Add(slimeid);
                            seller.OwnedSlimes.Remove(slimeid);
                            buyer.Gold -= slime.Price;
                            seller.Gold += slime.Price;

                            UserRepository.Update(buyer);
                            UserRepository.Update(seller);

                            SlimeService.UpdateSlime(new(slime.Id, slime.Name, false, buyer.Id));

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
