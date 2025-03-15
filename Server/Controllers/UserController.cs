using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Enums;
using Server.Models;
using Server.Services;


namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(UserService userService) : ControllerBase
    {
        private UserService UserService { get; set; } = userService;

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(UserService.GetUsers());
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User? user = UserService.GetUserById(id);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound("Could not find this user");
        }


        [HttpGet("Account/{id}")]
        public IActionResult GetUserAccountById(int id)
        {
            UserAccount? userAccount = UserService.GetUserAccountById(id);
            if (userAccount != null)
            {
                return Ok(userAccount);
            }
            return NotFound("Could not find this user's account");
        }


        [HttpGet("Account")]
        public IActionResult GetUserAccounts()
        {
            return Ok(UserService.GetUserAccounts());
        }

        [HttpPost("Validate")]
        public IActionResult IsUserValid([FromBody] UserUnique userUnique)
        {
            User? user = UserService.GetUserById(userUnique.Id);
            if (user != null)
            {
                if (userUnique.Username == user.Username && userUnique.Email == user.Email)
                {
                    return Ok("Successfully validated user");
                }
                return BadRequest("This is not the same user");
            }
            return NotFound("Could not find this user");
        }


        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserCredentials userAttempt)
        {
            UserAuth? auth = UserService.RegisterUser(userAttempt);
            if (auth != null)
            {
                return Ok(auth);
            }
            return BadRequest("Username/Email already exists");
        }


        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserCredentials userAttempt)
        {
            UserAuth? auth = UserService.LoginUser(userAttempt);
            if (auth != null)
            {
                return Ok(auth);
            }
            return BadRequest("Username/Password is incorrect");
        }

        [HttpPost("Splice")]
        public IActionResult SpliceSlime([FromBody] UserAccount userAccount)
        {
            UserAccount? newUserAccount = UserService.SpliceSlime(userAccount);
            if (newUserAccount != null)
            {
                return Ok(newUserAccount);
            }
            return BadRequest("Could not splice slime...");
        }

        [HttpPost("Train")]
        public IActionResult TrainSlime([FromBody] SlimeTrainer slimeTrainer)
        {
            Tuple<Status, SlimeStats?> result = UserService.TrainSlime(slimeTrainer);
            return result.Item1 switch
            {
                Status.SUCCESS => Ok(result.Item2),
                Status.NOSTAMINA => BadRequest("Not enough stamina"),
                Status.SLIMEISDEAD => BadRequest("Slime is dead"),
                Status.NOTOWN => BadRequest("Slime is not owned by you"),
                Status.OWNERNOTFOUND => NotFound("User not found"),
                Status.SLIMENOTFOUND => NotFound("Slime not found"),
                _ => BadRequest("You don't have enough Gold"),
            };
        }


        [HttpPost("Feed")]
        public IActionResult FeedSlime([FromBody] SlimeFeeder slimeFeeder)
        {
            Tuple<Status, SlimeStats?> result = UserService.FeedSlime(slimeFeeder);
            return result.Item1 switch
            {
                Status.SUCCESS => Ok(result.Item2),
                Status.NOSTAMINA => BadRequest("Not enough stamina"),
                Status.SLIMEISDEAD => BadRequest("Slime is dead"),
                Status.NOTOWN => BadRequest("Slime is not owned by you"),
                Status.OWNERNOTFOUND => NotFound("User not found"),
                Status.SLIMENOTFOUND => NotFound("Slime not found"),
                _ => BadRequest("You don't have enough Gold"),
            };
        }


        [HttpPost("Earn")]
        public IActionResult EarnGold([FromQuery] int id)
        {
            if (UserService.EarnGold(id))
            {
                return Ok("Successfully earnt 1000 gold");
            }
            return BadRequest("Failed to earn gold...");
        }

        [HttpPost("Purchase")]
        public IActionResult PurchaseSlime([FromBody] UserTransaction userTransaction)
        {
            if (UserService.PurchaseSlime(userTransaction))
            {
                return Ok("Slime purchase succeeded");
            }
            return BadRequest("Slime purchase failed");            
        }
    }
}
