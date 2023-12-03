using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace auction_web.Controllers
{
    [ApiController]
    
    [Route("api/[controller]")]
    public class LoginStatusController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult GetLoginStatus()
        {
            
            string Username = User.Identity.Name;
            return Ok(new { haslogined = true, username = Username });

        }
    }
}