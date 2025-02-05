using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.Collections;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlimeController : ControllerBase
    {
        private static readonly Slime[] Slimes = {
            new Slime("Jeff", 200),
            new Slime("Bob", 150),
            new Slime("Bill", 129),
            new Slime("Slimey", 500),
            new Slime("Goop", 740),
            new Slime("Glub", 1200),
            new Slime("limey", 500),
            new Slime("Slima", 500),
            new Slime("Slimy", 500),
            new Slime("Slimoo", 500)
        };


        [HttpGet(Name = "GetMarketSlimes")]
        public Slime[] GetMarketSlimes()
        {
            return Slimes;
        }
    }
}
