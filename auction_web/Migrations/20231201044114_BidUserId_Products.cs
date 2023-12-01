using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace auction_web.Migrations
{
    /// <inheritdoc />
    public partial class BidUserId_Products : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_BidUserId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_BidUserId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "BidUserId",
                table: "Products",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "BidUserId",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_BidUserId",
                table: "Products",
                column: "BidUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_BidUserId",
                table: "Products",
                column: "BidUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
