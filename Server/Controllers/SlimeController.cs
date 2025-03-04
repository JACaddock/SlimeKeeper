using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlimeController : ControllerBase
    {
        private static readonly Slime[] Slimes = {
            new("Jeff", 200, 1, "red", 0),
            new("Bob", 150, 2, "Green"),
            new("Bill", 129, 0, "DarkCyan", 0),
            new("Slimey", 500, 5, "White"),
            new("Goop", 740, 3, "Gold"),
            new("Glub", 1200, 4, "Blue", 0),
            new("limey", 500, 1, "Yellow"),
            new("Slima", 500, 3, "Lime", 0),
            new("Slimy", 500, 5, "Orange"),
            new("Slimoo", 500, 2, "DarkGreen")
        };

        [HttpGet]
        public Slime[] GetSlimes()
        {
            return Slimes;
        }

        [HttpGet("Market")]
        public Slime[] GetMarketSlimes()
        {
            return Slimes.Where(i => i.IsOnMarket).ToArray();
        }


        [HttpGet("{id}")]
        public Slime GetSlimeById(int id)
        {
            return Slimes[id];
        }
    }
}
