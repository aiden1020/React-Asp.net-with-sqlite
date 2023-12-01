using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace auction_web.Migrations
{
    /// <inheritdoc />
    public partial class update_Products_new_prop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HighestBidPrice",
                table: "Products",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighestBidPrice",
                table: "Products");
        }
    }
}
