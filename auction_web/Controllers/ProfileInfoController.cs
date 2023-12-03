using Microsoft.AspNetCore.Mvc;
using auction_web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace auction_web.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProfileInfoController : ControllerBase
    {
        private readonly AuctionDb _context;

        public ProfileInfoController(AuctionDb context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> ProfileInfo()
        {
            string username = User.Identity.Name;

            var currentUser = await _context.Users.FirstOrDefaultAsync(u=>u.UserName == username);
            
            return Ok(new { username= currentUser.UserName , 
                            email = currentUser.Email ,
                            firstname = currentUser.FirstName,
                            lastname = currentUser.LastName,
                           });
        }
    }
}