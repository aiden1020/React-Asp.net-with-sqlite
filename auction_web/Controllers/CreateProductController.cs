using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using auction_web.Models;
using Microsoft.AspNetCore.Routing.Constraints;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
namespace auction_web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreateProductController : ControllerBase
    {
        private readonly AuctionDb _context;
        private IHostEnvironment _hostingEnvironment;

        public CreateProductController(AuctionDb context,IHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] Product product , [FromForm] List<IFormFile> images)
        {
            
            if (ModelState.IsValid)
            {   
                
                string userName = User.Identity.Name;
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                product.UserId = existingUser.UserId;
                product.Owner = existingUser;
                product.Images ??= new List<ProductImage>();
                string path = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads"); 
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                foreach(var image in images)
                {
                    string filepath = Path.Combine(path, image.FileName); 
                    using (Stream fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                    product.Images.Add(new ProductImage { ImagePath = filepath }); 
                }

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest(ModelState);
        }

    }
}