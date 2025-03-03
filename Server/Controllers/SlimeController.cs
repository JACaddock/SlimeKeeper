using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlimeController : ControllerBase
    {
        private static readonly Slime[] Slimes = {
            new Slime("Jeff", 200, 1, "red", 0),
            new Slime("Bob", 150, 2, "Green"),
            new Slime("Bill", 129, 0, "DarkCyan", 0),
            new Slime("Slimey", 500, 5, "White"),
            new Slime("Goop", 740, 3, "Gold"),
            new Slime("Glub", 1200, 4, "Blue", 0),
            new Slime("limey", 500, 1, "Yellow"),
            new Slime("Slima", 500, 3, "Lime", 0),
            new Slime("Slimy", 500, 5, "Orange"),
            new Slime("Slimoo", 500, 2, "DarkGreen")
        };


        [HttpGet(Name = "GetMarketSlimes")]
        public Slime[] GetMarketSlimes()
        {
            return Slimes;
        }


        [HttpPost(Name = "PostSlime")]
        public Slime PostSlime(int id)
        {
            return Slimes[id];
        }
    }
}
