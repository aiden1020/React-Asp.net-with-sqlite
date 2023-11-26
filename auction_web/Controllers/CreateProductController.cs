using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using auction_web.Models;

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
        public  IActionResult  CreateProduct([FromForm] Product product , [FromForm] List<IFormFile> images)
        {
            
            if (ModelState.IsValid)
            {
                
                return Ok();
            }

            return BadRequest(ModelState);
        }

    }
}