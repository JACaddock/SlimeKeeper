using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Server.Config;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController(IOptions<TimeBasedSettings> timeBasedSettings) : ControllerBase
    {
        private readonly TimeBasedSettings TimeBasedSettings = timeBasedSettings.Value;

        [HttpGet]
        public IActionResult GetGameSettings()
        {
            return Ok(TimeBasedSettings);
        }
    }
}