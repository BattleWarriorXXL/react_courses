using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckList.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameDueDateToDate_Tasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DueDate",
                table: "Tasks",
                newName: "Date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Tasks",
                newName: "DueDate");
        }
    }
}
