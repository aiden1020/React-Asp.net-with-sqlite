using Microsoft.AspNetCore.Mvc;
using auction_web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace auction_web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly AuctionDb _context;

        public BidController(AuctionDb context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost("{id}/bid")]
        public async Task<IActionResult> AddNewBid(int id,[FromQuery] int bidPrice){
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null)
            {
                return NotFound($"No products found for product id");
            }
            string username = User.Identity.Name;

            var BidUser = await _context.Users.FirstOrDefaultAsync(u=>u.UserName == username);
            if ((product.HighestBidPrice == null || bidPrice>product.HighestBidPrice) && BidUser.UserId!=product.UserId){

                product.BidUserId = BidUser.UserId;
                product.BidUser = BidUser;
                product.HighestBidPrice = bidPrice;

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Update new highest Price");
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Conflict("Concurrency conflict. Please try again.");
                }
            }
            else
            {
                return BadRequest("Bid Price is less than or equal to the current highest price.");
            }
        }
        [Authorize]
        [HttpPost("{id}")]
        public async Task<IActionResult> EarlyEnd(int id){
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null)
            {
                return NotFound($"No products found for product id");
            }
            if(product.EndDate> DateTime.Now){
                product.EndDate =  DateTime.Now;
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Update EndDate");
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Conflict("Concurrency conflict. Please try again.");
                }
            }
            else
            {
                return BadRequest("Product is end");
            }
        }
    }
}