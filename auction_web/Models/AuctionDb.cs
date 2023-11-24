using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace auction_web.Models
{
    public class AuctionDb : DbContext
    {
        public DbSet<User> Users { get; set; }
        public string DbPath { get; }
        public AuctionDb(DbContextOptions<AuctionDb> options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = "/Users/aiden/github/auction_web/auction_web/database.db";
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

    }

}