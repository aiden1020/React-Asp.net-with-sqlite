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

        public CreateProductController(AuctionDb context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost]
        public  IActionResult  CreateProduct([FromForm] Product product)
        {
            if (ModelState.IsValid)
            {
                return Ok("模型通過驗證，可以執行相應的操作。");
            }

            // 如果模型未通過驗證，返回包含錯誤信息的 BadRequest 響應
            return BadRequest(ModelState);
        }
    }
}