using Server.Models;

namespace Server.DTO
{
    public class SlimeDTO(int id, string name, int size, string color, bool isonmarket, int price, 
        int? ownerid, string? ownername, SlimeStats slimeStats, string? svg)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public int Size { get; set; } = size;
        public string Color { get; set; } = color;
        public bool IsOnMarket { get; set; } = isonmarket;
        public int Price { get; set; } = price;
        public int? OwnerId { get; set; } = ownerid;
        public string? OwnerName { get; set; } = ownername;
        public SlimeStats SlimeStats { get; set; } = slimeStats;
        public string? Svg { get; set; } = svg;
    }
}
