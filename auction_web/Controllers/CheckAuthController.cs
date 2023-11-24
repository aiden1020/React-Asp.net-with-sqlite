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
    public class CheckAuthController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult CheckAuth()
        {
            return Ok(new {isAuth = true});

        }
    }
}