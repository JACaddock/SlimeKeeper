using Server.Enums;

namespace Server.DTO
{
    public class SlimeTrainer(TrainingType training, int? intensity, int cost, int slimeid, int ownerid)
    {
        public TrainingType Training { get; set; } = training;
        public int? Intensity { get; set; } = intensity;
        public int Cost { get; set; } = cost;
        public int SlimeId { get; set; } = slimeid;
        public int OwnerId { get; set; } = ownerid;

    }
}
