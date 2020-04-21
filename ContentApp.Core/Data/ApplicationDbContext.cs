using ContentApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace ContentApp.Core.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
    }
}
