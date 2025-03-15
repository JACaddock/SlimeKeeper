using Server.DTO;
using Server.Models;
using System.Drawing;

namespace Server.Repositories.Mock
{
    public class MockSlimeRepository : ISlimeRepository
    {
        private readonly List<Slime> Slimes = [];

        public List<Slime> GetAll()
        {
            return Slimes;
        }

        public List<Slime> GetAllMarket()
        {
            return [.. Slimes.Where(i => i.IsOnMarket)];
        }

        public SlimeDTO? GetById(int id)
        {
            try
            {
                Slime slime = Slimes[id];
                SlimeDTO slimeDTO = new(slime.Id, slime.Name, slime.Size, slime.Color, slime.IsOnMarket, 
                    slime.Price, slime.OwnerId, slime.Owner != null ? slime.Owner.Username: "???", slime.SlimeStats, slime.Svg);
                return slimeDTO;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<SlimeDTO> GetByOwner(int id)
        {
            List<Slime> slimes = [.. Slimes.Where(i => i.OwnerId == id)];
            return [.. slimes.Select(s => new SlimeDTO(s.Id, s.Name, s.Size, s.Color, s.IsOnMarket,
                    s.Price, s.OwnerId, s.Owner != null ? s.Owner.Username: "???", s.SlimeStats, s.Svg))];
        }
        public bool Add(Slime slime)
        {
            List<Slime> slimes = [.. Slimes.Where(i => i.Id == slime.Id)];
            if (Slimes.Count > slime.Id || slimes.Count > 0) return false;
            Slimes.Add(slime);
            return true;
        }
        public bool Update(Slime slime)
        {
            try
            {
                Slimes[slime.Id] = slime;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Delete(Slime slime)
        {
            return Slimes.Remove(slime);
        }

        public bool DeleteMany(List<int> slimeIds)
        {
            try
            {
                foreach (var id in slimeIds)
                {
                    Slimes.RemoveAt(id);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
