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
            Slime? slime = SlimeService.GetSlimeById(id);
            if (slime == null)
            {
                return NotFound("Slime not found");
            }
            return Ok(slime);
        }

        /*[HttpPost("Create")]
        public IActionResult CreateSlime([FromBody] Slime slime)
        {
            return Ok(SlimeService.AddSlime(slime));
        }*/



        [HttpPost("Update")]
        public IActionResult UpdateSlime([FromBody] SlimeEditable updatedSlime)
        {
            Slime? slime = SlimeService.UpdateSlime(updatedSlime);
            if (slime != null)
            {
                return Ok(slime);   
            }
            return NotFound("Slime not found or update failed");
        }
    }
}
