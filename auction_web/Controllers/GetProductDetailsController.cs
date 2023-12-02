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
                .Include(p => p.Owner)

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
                image = p.Images.Select(img => img.ImagePath).ToList(),
                starting_price = p.Price,
                owner_name = p.Owner.UserName,
                category = p.Category,
                subcategory =p.SubCategory,
                current_highest_price = p.HighestBidPrice,
            });

            return Ok(productsResponse);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductsById(int id)
        {
            var productsById = await _context.Products
                .Where(p => p.ProductId == id)
                .Include(p => p.Images)
                .Include(p => p.Owner)
                .Include(p => p.BidUser)

                .ToListAsync();

            if (productsById == null)
            {
                return NotFound($"No products found for category");
            }

            var productsResponse = productsById.Select(p => new
            {
                productId = p.ProductId,
                productName = p.ProductName,
                description = p.Description,
                start_date = p.StartDate,
                end_date = p.EndDate,
                image = p.Images.Select(img => img.ImagePath).ToList(),
                starting_price = p.Price,
                owner_name = p.Owner.UserName,
                category = p.Category,
                subcategory =p.SubCategory,
                current_highest_price = p.HighestBidPrice,
                biduser_id = p.BidUserId,
                biduser_name = p.BidUser?.UserName
            });

            return Ok(productsResponse);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            var productsByCategory = await _context.Products
                .Where(p => p.SubCategory == category)
                .Where(p => p.StartDate <= DateTime.Now)
                .Where(p => p.EndDate >= DateTime.Now)
                .Include(p => p.Images)
                .Include(p => p.Owner)
                .ToListAsync();

            if (productsByCategory == null || productsByCategory.Count == 0)
            {
                return NotFound($"No products found for category");
            }

            var productsResponse = productsByCategory.Select(p => new
            {
                productId = p.ProductId,
                productName = p.ProductName,
                description = p.Description,
                start_date = p.StartDate,
                end_date = p.EndDate,
                image = p.Images.Select(img => img.ImagePath).ToList(),
                starting_price = p.Price,
                owner_name = p.Owner.UserName,
                category = p.Category,
                subcategory =p.SubCategory,
                current_highest_price = p.HighestBidPrice,

            });

            return Ok(productsResponse);
        }


    }
}