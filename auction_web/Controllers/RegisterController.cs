using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using auction_web.Models;

namespace auction_web.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly AuctionDb _context;

        public RegisterController(AuctionDb context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync(); // 使用ToListAsync方法從資料庫中檢索所有使用者

            return Ok(users);
        }
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("無效的使用者資料。");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName);
            if (existingUser != null)
            {
                return Conflict("使用者名稱已存在。");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("使用者註冊成功。");
        }
    }
}
