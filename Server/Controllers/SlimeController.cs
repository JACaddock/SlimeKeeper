using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Enums;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlimeController(SlimeService slimeService) : ControllerBase
    {
        private SlimeService SlimeService { get; set; } = slimeService;

        [HttpGet]
        public IActionResult GetSlimes()
        {
            return Ok(SlimeService.GetAll());
        }

        [HttpGet("Market")]
        public IActionResult GetMarketSlimes()
        {
            return Ok(SlimeService.GetAllMarket());
        }


        [HttpGet("{id}")]
        public IActionResult GetSlimeById(int id)
        {
            SlimeDTO? slime = SlimeService.GetSlimeById(id);
            if (slime == null)
            {
                return NotFound("Slime not found");
            }
            return Ok(slime);
        }

        [HttpGet("Owner/{ownerid}")]
        public IActionResult GetSlimesByOwner(int ownerid)
        {
            List<SlimeDTO>? slimes = SlimeService.GetSlimesByOwner(ownerid);
            if (slimes == null)
            {
                return NotFound("Can't find any slimes");
            }
            return Ok(slimes);
        }

        /*[HttpPost("Create")]
        public IActionResult CreateSlime([FromBody] Slime slime)
        {
            return Ok(SlimeService.AddSlime(slime));
        }*/



        [HttpPost("Update")]
        public IActionResult UpdateSlime([FromBody] SlimeEditable updatedSlime)
        {
            SlimeDTO? slime = SlimeService.UpdateSlime(updatedSlime);
            if (slime != null)
            {
                return Ok(slime);   
            }
            return NotFound("Slime not found or update failed");
        }
    }
}
