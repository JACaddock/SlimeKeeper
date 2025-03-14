using Server.DTO;
using Server.Models;

namespace Server.Repositories
{
    public interface ISlimeRepository
    {
        SlimeDTO? GetById(int id);
        List<SlimeDTO> GetByOwner(int id);
        List<Slime> GetAll();
        List<Slime> GetAllMarket();
        bool Add(Slime slime);
        bool Update(Slime slime);
        bool Delete(Slime slime);
    }
}
