using Server.Enums;

namespace Server.Models
{
    public class SlimeStats(int id, int health, int stamina, int hunger, int strength, int speed, Rarity rarity = Rarity.COMMON)
    {
        public int Id { get; set; } = id;
        public int Health { get; set; } = health;
        public int MaxHealth { get; set; } = health;
        public int Stamina { get; set; } = stamina;
        public int MaxStamina { get; set; } = stamina;
        public int Hunger { get; set; } = hunger / 2;
        public int MaxHunger { get; set; } = hunger;
        public int Strength { get; set; } = strength;
        public int Speed { get; set; } = speed;
        public Rarity Rarity { get; set; } = rarity;
    }
}
