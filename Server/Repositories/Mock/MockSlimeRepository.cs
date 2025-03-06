using Server.Models;

namespace Server.Repositories.Mock
{
    public class MockSlimeRepository(IUserRepository userRepository) : ISlimeRepository
    {
        private readonly List<Slime> Slimes = [.. userRepository.GetAll().SelectMany(user => user.Slimes)];

        public List<Slime> GetAll()
        {
            return Slimes;
        }

        public List<Slime> GetAllMarket()
        {
            return [.. Slimes.Where(i => i.IsOnMarket)];
        }

        public Slime GetById(int id)
        {
            return Slimes[id];
        }

        public Slime GetByUser(int id)
        {
            throw new NotImplementedException();
        }

        public bool AddSlime(Slime slime)
        {
            Slimes.Add(slime);
            return true;
        }

        public bool DeleteSlime(Slime slime)
        {
            return Slimes.Remove(slime);
        }
    }
}
