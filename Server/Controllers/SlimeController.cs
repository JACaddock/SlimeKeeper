using Microsoft.AspNetCore.Mvc;
using Server.Controllers.Listener;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlimeController(ISlimeRepository slimeRepository) : ControllerBase, IUserListener
    {
        private ISlimeRepository SlimeRepository { get; set; } = slimeRepository;

        [HttpGet]
        public List<Slime> GetSlimes()
        {
            return SlimeRepository.GetAll();
        }

        [HttpGet("Market")]
        public List<Slime> GetMarketSlimes()
        {
            return SlimeRepository.GetAllMarket();
        }


        [HttpGet("{id}")]
        public Slime? GetSlimeById(int id)
        {
            return SlimeRepository.GetById(id);
        }

        [HttpPost("Add")]
        public bool AddSlime([FromBody] Slime slime)
        {
            return SlimeRepository.Add(slime);
        }

        [HttpPost("Update")]
        public Slime? UpdateSlime([FromBody] EditableSlime slime)
        {
            Console.WriteLine(slime);
            Slime? oldSlime = SlimeRepository.GetById(slime.Id);
            if (oldSlime != null) {
                if (oldSlime.OwnerId == slime.OwnerId)
                {
                    oldSlime.Name = slime.Name;
                    oldSlime.IsOnMarket = slime.IsOnMarket;
                    SlimeRepository.Update(oldSlime);
                }
                return oldSlime; 
            }
            return null;
        }

        public void OnUserRegistered(User user)
        {
            foreach (var slime in user.Slimes)
            {
                AddSlime(slime);
            }
        }

        public void OnSlimePurchased(int userid, int slimeid)
        {
            Slime? slime = GetSlimeById(slimeid);
            if (slime != null)
            {
                slime.OwnerId = userid;
                slime.IsOnMarket = false;
            }
        }
    }
}
