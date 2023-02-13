using CheckList.DataAccess.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CheckList.DataAccess.Context
{
    public class ApplicationIdentityDbContext : IdentityDbContext<UserEntity>
    {
        public ApplicationIdentityDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasDefaultSchema("Identity");

            builder.Entity<UserEntity>(entity =>
            {
                entity.ToTable(name: "Users");
            });
        }
    }
}
