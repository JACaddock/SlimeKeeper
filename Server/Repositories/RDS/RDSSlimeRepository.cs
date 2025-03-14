using Server.Data;
using Server.Models;

namespace Server.Repositories.RDS
{
    public class RDSSlimeRepository(AppDbContext dbContext) : ISlimeRepository
    {
        private AppDbContext DbContext { get; set; } = dbContext;

        public Slime? GetById(int id)
        {
            return DbContext.Slimes.Find(id);
        }

        public List<Slime> GetByOwner(int ownerId)
        {
            return [.. DbContext.Slimes.Where(s => s.OwnerId == ownerId)];
        }

        public List<Slime> GetAll()
        {
            return [.. DbContext.Slimes];
        }

        public List<Slime> GetAllMarket()
        {
            return [.. DbContext.Slimes.Where(s => s.IsOnMarket)];
        }

        public bool Add(Slime slime)
        {
            DbContext.Slimes.Add(slime);
            return DbContext.SaveChanges() > 0;
        }

        public bool Update(Slime slime)
        {
            DbContext.Slimes.Update(slime);
            return DbContext.SaveChanges() > 0;
        }

        public bool Delete(Slime slime)
        {
            DbContext.Slimes.Remove(slime);
            return DbContext.SaveChanges() > 0;
        }
    }
}
