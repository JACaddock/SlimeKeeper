﻿using Microsoft.AspNetCore.Mvc;
using Server.Controllers.Listener;
using Server.Models;
using Server.Repositories;


namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserRepository userRepository, IEnumerable<IUserListener> listeners) : ControllerBase
    {
        private IUserRepository UserRepository { get; set; } = userRepository;
        private IEnumerable<IUserListener> Listeners { get; set; } = listeners;


        [HttpGet]
        public List<UserUnique> GetUsers()
        {
            return UserRepository.GetAllUnique();
        }

        [HttpGet("{id}")]
        public User? GetUserById(int id)
        {
            return UserRepository.GetById(id);
        }


        [HttpGet("Account/{id}")]
        public UserAccount? GetUserAccount(int id)
        {
            User? user = UserRepository.GetById(id);
            if (user != null)
            {
                return new(id, user.Username, user.IsAdmin, user.Gold, user.Slimes, user.Friends);
            }
            return null;
        }


        [HttpPost("Register")]
        public UserAuth? Register([FromBody] UserCredentials userAttempt)
        {
            if (!CheckIfExists(userAttempt.Username, userAttempt.Email))
            {
                User user = new(userAttempt.Username, userAttempt.Email, userAttempt.Password);
                UserRepository.AddUser(user);

                foreach (var listener in Listeners)
                {
                    listener.OnUserRegistered(user);
                }

                return new(new(user.Id, user.Username, user.Email), "sdgsdsdgsg");
            }
            return null;
        }

        public bool CheckIfExists(string username, string email)
        {
            User? userByUsername = UserRepository.GetByUsername(username);
            User? userByEmail = UserRepository.GetByEmail(email);
            if (userByUsername != null || userByEmail != null)
            {
                return true;
            }
            return false;
        }


        [HttpPost("Login")]
        public UserAuth? Login([FromBody] UserCredentials userAttempt)
        {
            User? user = UserRepository.GetByUsername(userAttempt.Username);
            if (user?.Username == userAttempt.Username && user?.Password == userAttempt.Password)
            {
                return new(new(user.Id, user.Username, user.Email), "byaugwuabib");
            }
            return null;
        }

        [HttpPost("LoginByUsername")]
        public User? LoginByUsername(string username, string password)
        {
            User? user = UserRepository.GetByUsername(username);
            if (user?.Username == username && user?.Password == password)
            {
                return user;
            }
            return null;
        }


        [HttpPost("LoginByEmail")]
        public User? LoginByEmail(string email, string password)
        {
            User? user = UserRepository.GetByEmail(email);
            if (user?.Email == email && user?.Password == password)
            {
                return user;
            }
            return null;
        }

        [HttpPost("Purchase")]
        public bool PurchaseSlime([FromBody] int buyerid, int sellerid, int slimeid)
        {
            User? buyer = UserRepository.GetById(buyerid);
            User? seller = UserRepository.GetById(sellerid);
            if (buyer != null && seller != null)
            {
                foreach (var slime in seller.Slimes)
                {
                    if (slime.Id == slimeid)
                    {
                        if (buyer.Gold >= slime.Price && slime.IsOnMarket)
                        {
                            buyer.Slimes.Add(slime);
                            seller.Slimes.Remove(slime);
                            buyer.Gold -= slime.Price;
                            slime.OwnerId = buyer.Id;

                            foreach (var listener in Listeners)
                            {
                                listener.OnSlimePurchased(buyerid, slimeid);
                            }
                            return true;
                        }
                        break;
                    }
                }
            }
            return false;            
        }
    }
}
