using Server.Enums;

namespace Server.Models
{
    public class SlimeStats(
        int id, int health, int healthCap, int stamina, int staminaCap,
        int hunger, int hungerCap, int strength, int strengthCap,
        int speed, int speedCap, Rarity rarity = Rarity.COMMON)
    {
        public int Id { get; set; } = id;
        public int Health { get; set; } = health;
        public int MaxHealth { get; set; } = health;
        public int HealthCap { get; set; } = healthCap;
        public double HealthTraining { get; set; } = 0.0;
        public int Stamina { get; set; } = stamina;
        public int MaxStamina { get; set; } = stamina;
        public int StaminaCap { get; set; } = staminaCap;
        public double StaminaTraining { get; set; } = 0.0;
        public int Hunger { get; set; } = hunger / 2;
        public int MaxHunger { get; set; } = hunger;
        public int HungerCap { get; set; } = hungerCap;
        public double HungerTraining { get; set; } = 0.0;
        public int Strength { get; set; } = strength;
        public int StrengthCap { get; set; } = strengthCap;
        public double StrengthTraining { get; set; } = 0.0;
        public int Speed { get; set; } = speed;
        public int SpeedCap { get; set; } = speedCap;
        public double SpeedTraining { get; set; } = 0.0;
        public Rarity Rarity { get; set; } = rarity;
    }
}
