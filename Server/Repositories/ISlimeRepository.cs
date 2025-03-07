using Server.Models;

namespace Server.Repositories
{
    public interface ISlimeRepository
    {
        Slime? GetById(int id);
        Slime GetByUser(int id);
        List<Slime> GetAll();
        List<Slime> GetAllMarket();
        bool Add(Slime slime);
        bool Update(Slime slime);
        bool Delete(Slime slime);
    }
}
