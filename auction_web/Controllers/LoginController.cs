using Microsoft.AspNetCore.Mvc;
using auction_web.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace auction_web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class LoginController : ControllerBase
    {
        private readonly AuctionDb _context;

        public LoginController(AuctionDb context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> LoginUser([FromBody] User user){

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName);
            if (existingUser != null ){
                if(existingUser.Password == user.Password){ 
                    Console.WriteLine(existingUser.UserId);
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName)
                    };
                    string tokenStr = GenerateJwtToken(claims);

                    return Ok(new { token = tokenStr});
                }
                else{
                    return Conflict("用戶名或密碼錯誤");
                }
            }
            else{
                return Conflict("用戶名不存在");
            } 
        }
        private string GenerateJwtToken(List<Claim> claims)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var securityKey = configuration["JwtSettings:SignKey"];  
            var token = new JwtSecurityToken(
                issuer: configuration["JwtSettings:Issuer"],
                audience: configuration["JwtSettings:Audience"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey)),
                    SecurityAlgorithms.HmacSha256)
            );

            var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenStr;
        }
    }
}