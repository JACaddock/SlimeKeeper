using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.Reflection.Metadata.Ecma335;


namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly User[] Users = {
            new("johnny151", "johnny151@gmail.com", "password123"),
            new("janeDoe", "janedoe@gmail.com", "password123"),
            new("jimmy", "jimmy@gmail.com", "password123"),
            new("dantheman", "dantheman@gmail.com", "pass1234")
        };


        [HttpGet]
        public User[] GetUsers()
        {
            return Users;
        }

        [HttpGet("{id}")]
        public User GetUserById(int id)
        {
            return Users[id];
        }


        [HttpPost("Login")]
        public User? Login([FromBody] User userAttempt)
        {
            foreach (User user in Users)
            {
                if (user.Username == userAttempt.Username && user.Password == userAttempt.Password)
                {
                    return user;
                }
            }
            return null;
        }

        [HttpPost("LoginByUsername")]
        public User? LoginByUsername(string username, string password)
        {
            foreach (User user in Users)
            {
                if (user.Username == username && user.Password == password)
                {
                    return user;
                }
            }
            return null;
        }


        [HttpPost("LoginByEmail")]
        public User? LoginByEmail(string email, string password)
        {
            foreach (User user in Users)
            {
                if (user.Email == email && user.Password == password)
                {
                    return user;
                }
            }
            return null;
        }
    }
}
