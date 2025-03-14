﻿using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {


        public DbSet<User> Users { get; set; }
        public DbSet<Slime> Slimes { get; set; }
        public DbSet<SlimeStats> SlimeStats { get; set; }

    }
}
