using Microsoft.AspNetCore.Mvc;
using auction_web.Models;
using Microsoft.AspNetCore.Authorization;

namespace auction_web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeleteProductController : ControllerBase
    {
        private readonly AuctionDb _context;

        public DeleteProductController(AuctionDb context)
        {
            _context = context;
        }
        [Authorize]
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound("沒有這件商品");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok("拍賣商品已刪除");
        }

    }
}