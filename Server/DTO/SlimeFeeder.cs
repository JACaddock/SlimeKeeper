using Server.Enums;

namespace Server.DTO
{
    public class SlimeFeeder(int food, int cost, int slimeid, int ownerid)
    {
        public int Food { get; set; } = food;
        public int Cost { get; set; } = cost;
        public int SlimeId { get; set; } = slimeid;
        public int OwnerId { get; set; } = ownerid;

    }
}
