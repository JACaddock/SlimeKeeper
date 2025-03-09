using Server.Models;

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

        public Slime? GetById(int id)
        {
            try
            {
                return Slimes[id];
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Slime> GetByOwner(int id)
        {
            return [.. Slimes.Where(i => i.OwnerId == id)];
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
    }
}
