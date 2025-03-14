using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Slime
    {
        public Slime() { }

        public Slime(int id, string name, int size, string color, bool isonmarket, int price, int? ownerid, string? ownername, SlimeStats slimestats)
        {
            Id = id;
            Name = name;
            Size = size;
            Color = color;
            IsOnMarket = isonmarket;
            Price = price;
            OwnerId = ownerid;
            OwnerName = ownername;
            SlimeStats = slimestats;
        }

        [Key] public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Size { get; set; }
        public string Color { get; set; } = "";
        public bool IsOnMarket { get; set; } 
        public int Price { get; set; }
        public int? OwnerId { get; set; } 
        public string? OwnerName { get; set; }
        public SlimeStats SlimeStats { get; set; } = new();
        public string? Svg { get; set; }
    }
}
