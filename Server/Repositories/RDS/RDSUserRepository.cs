using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTO;
using Server.Models;

namespace Server.Repositories.RDS
{
    public class RDSUserRepository(AppDbContext dbContext) : IUserRepository
    {
        private AppDbContext DbContext { set; get; } = dbContext;

        public User? GetById(int id)
        {
            return DbContext.Users
                .Include(u => u.OwnedSlimes)
                    .ThenInclude(s => s.SlimeStats)
                .FirstOrDefault(u => u.Id == id);
        }

        public List<User> GetAll()
        {
            return [.. DbContext.Users.Include(u => u.OwnedSlimes)];
        }

        public List<UserUnique> GetAllUnique()
        {
            return [.. DbContext.Users.Select(u => new UserUnique( u.Id, u.Username, u.Email ))];
        }

        public User? GetByUsername(string username)
        {
            return DbContext.Users
                .Include(u => u.OwnedSlimes)
                .FirstOrDefault(u => u.Username == username);
        }

        public User? GetByEmail(string email)
        {
            return DbContext.Users.FirstOrDefault(u => u.Email == email);
        }

        public bool Add(User user)
        {
            DbContext.Users.Add(user);
            return DbContext.SaveChanges() > 0;
        }

        public bool Update(User user)
        {
            var existingUser = DbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser == null) return false;

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.IsAdmin = user.IsAdmin;
            existingUser.IsVerified = user.IsVerified;
            existingUser.Gold = user.Gold;
            existingUser.LastClaimedDaily = user.LastClaimedDaily;
            existingUser.Friends = user.Friends;

            return DbContext.SaveChanges() > 0;
        }

        public bool Delete(User user)
        {
            DbContext.Users.Remove(user);
            return DbContext.SaveChanges() > 0;
        }
    }
}
