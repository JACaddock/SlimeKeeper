using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Slime
    {
        public Slime() { }

        public Slime(string name, int size, string color, int price, 
            int? ownerid, SlimeStats slimestats)
        {
            Name = name;
            Size = size;
            Color = color;
            Price = price;
            OwnerId = ownerid;
            SlimeStats = slimestats;
        }

        [Key] public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Size { get; set; }
        public string Color { get; set; } = "";
        public bool IsOnMarket { get; set; } = false;
        public int Price { get; set; }
        [ForeignKey("Owner")] public int? OwnerId { get; set; }
        public virtual User? Owner { get; set; }
        public SlimeStats SlimeStats { get; set; } = new();
        public string? Svg { get; set; }
    }
}
