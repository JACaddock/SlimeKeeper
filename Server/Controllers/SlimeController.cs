using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlimeController(ISlimeRepository slimeRepository) : ControllerBase
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
        public Slime GetSlimeById(int id)
        {
            return SlimeRepository.GetById(id);
        }

        [HttpPost("Add")]
        public void AddSlime(Slime slime)
        {
            SlimeRepository.AddSlime(slime);
        }
    }
}
