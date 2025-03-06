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
    }
}
