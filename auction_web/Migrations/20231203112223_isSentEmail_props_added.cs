using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace auction_web.Migrations
{
    /// <inheritdoc />
    public partial class isSentEmail_props_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSentEmail",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSentEmail",
                table: "Products");
        }
    }
}
