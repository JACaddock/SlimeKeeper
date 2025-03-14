using Server.Config;
using Server.DTO;
using Server.Models;

namespace Server.Repositories.RDS
{
    public class RDSUserRepository(AppDbContext dbContext) : IUserRepository
    {
        private AppDbContext DbContext { set; get; } = dbContext;

        public bool Add(User user)
        {
            DbContext.Add(user);
            return true;
        }

        public bool Delete(User user)
        {
            return false;
        }

        public List<User> GetAll()
        {
            return [];
        }

        public List<UserUnique> GetAllUnique()
        {
            return [];
        }

        public User? GetByEmail(string email)
        {
            return null;
        }

        public User? GetById(int id)
        {
            return null;
        }

        public User? GetByUsername(string username)
        {
            return null;
        }

        public bool Update(User user)
        {
            DbContext.Update(user);
            return true;
        }
    }
}
