using Server.Enums;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class SlimeStats
    {
        public SlimeStats() { }

        public SlimeStats(int id, int health, int healthCap, int stamina, int staminaCap,
                        int hunger, int hungerCap, int strength, int strengthCap,
                        int speed, int speedCap, Rarity rarity = Rarity.COMMON)
        {
            Id = id;
            Health = health;
            MaxHealth = health;
            HealthCap = healthCap;
            Stamina = stamina;
            MaxStamina = stamina;
            StaminaCap = staminaCap;
            Hunger = hunger / 2;
            MaxHunger = hunger;
            HungerCap = hungerCap;
            Strength = strength;
            StrengthCap = strengthCap;
            Speed = speed;
            SpeedCap = speedCap;
            Rarity = rarity;

        }

        [Key] public int Id { get; set; }
        public double Age { get; set; } = 0;
        public double Health { get; set; } 
        public int MaxHealth { get; set; }
        public int HealthCap { get; set; }
        public double HealthTraining { get; set; } = 0.0;
        public double Stamina { get; set; } 
        public int MaxStamina { get; set; } 
        public int StaminaCap { get; set; } 
        public double StaminaTraining { get; set; } = 0.0;
        public double Hunger { get; set; } 
        public int MaxHunger { get; set; }
        public int HungerCap { get; set; } 
        public double HungerTraining { get; set; } = 0.0;
        public int Strength { get; set; } 
        public int StrengthCap { get; set; } 
        public double StrengthTraining { get; set; } = 0.0;
        public int Speed { get; set; }
        public int SpeedCap { get; set; } 
        public double SpeedTraining { get; set; } = 0.0;
        public Rarity Rarity { get; set; } 
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}
