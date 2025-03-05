using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories;


namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(IUserRepository userRepository) : ControllerBase
    {
        private IUserRepository UserRepository { get; set; } = userRepository;

        [HttpGet]
        public List<User> GetUsers()
        {
            return UserRepository.GetAll();
        }

        [HttpGet("{id}")]
        public User? GetUserById(int id)
        {
            return UserRepository.GetById(id);
        }

        [HttpPost("Register")]
        public bool Register([FromBody] User userAttempt)
        {
            if (!CheckIfExists(userAttempt.Username, userAttempt.Email))
            {
                UserRepository.AddUser(userAttempt);
                return true;
            }
            return false;
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
        public User? Login([FromBody] User userAttempt)
        {
            User? user = UserRepository.GetByUsername(userAttempt.Username);
            if (user?.Username == userAttempt.Username && user?.Password == userAttempt.Password)
            {
                return user;
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
    }
}
