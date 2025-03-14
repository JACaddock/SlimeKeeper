using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Config
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {


        public virtual DbSet<User> Users { get; set; }

    }
}
