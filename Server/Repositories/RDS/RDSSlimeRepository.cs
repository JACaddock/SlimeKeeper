using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTO;
using Server.Models;

namespace Server.Repositories.RDS
{
    public class RDSSlimeRepository(AppDbContext dbContext) : ISlimeRepository
    {
        private AppDbContext DbContext { get; set; } = dbContext;

        public SlimeDTO? GetById(int id)
        {
            var slime = DbContext.Slimes
                .Where(s => s.Id == id)
                .Select(s => new SlimeDTO(
                    s.Id, s.Name, s.Size, s.Color, s.IsOnMarket, s.Price, s.OwnerId, 
                    s.Owner != null ? s.Owner.Username : "???", s.SlimeStats, s.Svg
                    )
                )
                .FirstOrDefault();

            return slime;
        }

        public List<SlimeDTO> GetByOwner(int ownerId)
        {
            return [.. DbContext.Slimes
                .Where(s => s.OwnerId == ownerId)
                .Select(s => new SlimeDTO(
                    s.Id, s.Name, s.Size, s.Color, s.IsOnMarket, s.Price, s.OwnerId,
                    s.Owner != null ? s.Owner.Username : "???", s.SlimeStats, s.Svg
                    )
                )
             ];
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
            var existingSlime = DbContext.Slimes.FirstOrDefault(s => s.Id == slime.Id);
            if (existingSlime == null) return false;

            existingSlime.Name = slime.Name;
            existingSlime.IsOnMarket = slime.IsOnMarket;
            existingSlime.SlimeStats = slime.SlimeStats;
            existingSlime.Svg = slime.Svg?? existingSlime.Svg;
            existingSlime.OwnerId = slime.OwnerId;
            existingSlime.Price = slime.Price;

            return DbContext.SaveChanges() > 0;
        }

        public bool Delete(Slime slime)
        {
            DbContext.Slimes.Remove(slime);
            return DbContext.SaveChanges() > 0;
        }

        public bool DeleteMany(List<int> slimeIds)
        {
            DbContext.Slimes
                .Where(s => slimeIds.Contains(s.Id))
                .ExecuteDelete();
            return DbContext.SaveChanges() > 0;
        }
    }
}
