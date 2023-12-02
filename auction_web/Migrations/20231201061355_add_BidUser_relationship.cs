using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace auction_web.Migrations
{
    /// <inheritdoc />
    public partial class add_BidUser_relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Products_BidUserId",
                table: "Products",
                column: "BidUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_BidUserId",
                table: "Products",
                column: "BidUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_BidUserId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_BidUserId",
                table: "Products");
        }
    }
}
