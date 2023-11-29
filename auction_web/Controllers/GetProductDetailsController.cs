using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using auction_web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace auction_web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GetProductDetailsController : ControllerBase
    {
        private readonly AuctionDb _context;

        public GetProductDetailsController(AuctionDb context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images) // 如果需要提取商品的照片，請包含這個操作
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(new {
                productName = product.ProductName,
                description= product.Description,
                start_date = product.StartDate,
                end_date =product.EndDate,
            });
        }
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetProductsByCurrentUser()
    {
        string username = User.Identity.Name;

        var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

        if (currentUser == null)
        {
            return NotFound("Current user not found");
        }

        var products = await _context.Products
            .Where(p => p.UserId == currentUser.UserId)
            .Include(p => p.Images) // 如果需要提取商品的照片，請包含這個操作
            .ToListAsync();

        if (products == null || products.Count == 0)
        {
            return NotFound("No products found for the current user");
        }

        var productsResponse = products.Select(p => new
        {
            productId = p.ProductId,
            productName = p.ProductName,
            description = p.Description,
            start_date = p.StartDate,
            end_date = p.EndDate,
            image = p.Images.Select(img => img.ImagePath).ToList()
        });

        return Ok(productsResponse);
    }


    }
}