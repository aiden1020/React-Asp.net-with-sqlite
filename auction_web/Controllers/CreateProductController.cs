using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using auction_web.Models;
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
                string path = Path.Combine(_hostingEnvironment.ContentRootPath, "ClientApp/public/uploads"); 
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
                    string relative_path = Path.Combine("../../uploads/",image.FileName);
                    product.Images.Add(new ProductImage { ImagePath = relative_path }); 
                }

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest(ModelState);
        }

    }
}