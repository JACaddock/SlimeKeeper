using System.Drawing;

namespace Server.Models
{
    public class Slime
    {
        public static int Id { get; set; }
        public string? Name { get; set; }
        public string? Svg { get; set; }
        public int Size { get; set; }
        public Color? Color { get; set; }
        public bool IsOnMarket { get; set; } = false;
        public int Price { get; set; }

        public Slime(string name)
        {
            Id++;
            Name = name;
        }

        public Slime(string name, int price)
        {
            Id++;
            Name = name;
            Price = price;
            IsOnMarket = true;
        }
    }
}
