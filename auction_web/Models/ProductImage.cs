using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace auction_web.Models
{
    public class ProductImage
    {
        public int ProductImageId { get; set; }
        public string? ImagePath { get; set; }

        // 外部鍵，指向擁有這張照片的商品
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
