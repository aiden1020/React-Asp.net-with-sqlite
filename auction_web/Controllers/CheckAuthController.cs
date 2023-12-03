using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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