namespace Server.Models
{
    public class Slime(int id, string name, int size, string color, bool isonmarket, int price, int? ownerid, SlimeStats slimestats)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public int Size { get; set; } = size;
        public string Color { get; set; } = color;
        public int Age { get; set; } = 0;
        public bool IsOnMarket { get; set; } = isonmarket;
        public int Price { get; set; } = price;
        public int? OwnerId { get; set; } = ownerid;
        public SlimeStats SlimeStats { get; set; } = slimestats;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string? Svg { get; set; }
    }
}
