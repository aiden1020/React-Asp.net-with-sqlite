using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
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