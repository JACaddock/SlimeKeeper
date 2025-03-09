using Server.Enums;

namespace Server.Models
{
    public class SlimeStats(int id, int health, int stamina, int hunger, int strength, int speed, Rarity rarity = Rarity.COMMON)
    {
        public int Id { get; set; } = id;
        public int Health { get; set; } = health;
        public int MaxHealth { get; set; } = health;
        public double HealthTraining { get; set; } = 0.0;
        public int Stamina { get; set; } = stamina;
        public int MaxStamina { get; set; } = stamina;
        public double StaminaTraining { get; set; } = 0.0;
        public int Hunger { get; set; } = hunger / 2;
        public int MaxHunger { get; set; } = hunger;
        public double HungerTraining { get; set; } = 0.0;
        public int Strength { get; set; } = strength;
        public double StrengthTraining { get; set; } = 0.0;
        public int Speed { get; set; } = speed;
        public double SpeedTraining { get; set; } = 0.0;
        public Rarity Rarity { get; set; } = rarity;
    }
}
