using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace auction_web.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int? BidUserId { get; set; }

        public User? BidUser { get; set; }

        public string? ProductName { get; set; }
        public int? Price { get; set; }
        public int? HighestBidPrice { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? SubCategory { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        // 商品的照片列表
        public ICollection<ProductImage>? Images { get; set; }
        // 商品的擁有者
        public int UserId { get; set; }
        public User? Owner { get; set; }

    }
}