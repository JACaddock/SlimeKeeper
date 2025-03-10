using Server.DTO;
using Server.Enums;
using Server.Helpers;
using Server.Models;
using Server.Repositories;

namespace Server.Services
{
    public class SlimeService(ISlimeRepository slimeRepository)
    {
        private readonly ISlimeRepository SlimeRepository = slimeRepository;


        public List<Slime> GetAll()
        {
            return SlimeRepository.GetAll();
        }

        public List<Slime> GetAllMarket()
        {
            return SlimeRepository.GetAllMarket();
        }


        public Slime? GetSlimeById(int id)
        {
            Slime? slime = SlimeRepository.GetById(id);
            if (slime != null)
            {
                UpdateStatus(slime);
            }
            return slime;
        }

        public List<Slime> GetSlimesByOwner(User owner)
        {
            List<Slime> slimes = SlimeRepository.GetByOwner(owner.Id);
            if (slimes.Count == 0 && owner.OwnedSlimes.Count > 0)
            {
                for (int i = 0; i < owner.OwnedSlimes.Count; i++)
                {
                    Slime slime = CreateRandomSlime(owner.Id);
                    owner.OwnedSlimes[i] = slime.Id;
                    slimes.Add(slime);
                }
            }
            return slimes;
        }

        public Tuple<Status, SlimeStats?> TrainSlime(SlimeTrainer slimeTrainer)
        {
            Slime? slime = SlimeRepository.GetById(slimeTrainer.SlimeId);
            if (slime == null) return new(Status.SLIMENOTFOUND, null);

            if (slimeTrainer.OwnerId != slime.OwnerId) return new(Status.NOTOWN, null);

            SlimeStats stats = slime.SlimeStats;
            if (stats.Stamina <= 0) return new(Status.NOSTAMINA, stats);

            int intensity = slimeTrainer.Intensity ?? 1;

            switch (slimeTrainer.Training)
            {
                case TrainingType.HEALTH:
                    if (stats.MaxHealth >= stats.HealthCap) return new(Status.STATATCAP, stats);
                    stats.HealthTraining += (2.0 * intensity);
                    if (stats.HealthTraining >= 1.0)
                    {
                        int healthIncrease = (int)(stats.HealthTraining);
                        stats.MaxHealth += healthIncrease;
                        stats.Health += healthIncrease;
                        stats.HealthTraining -= healthIncrease;
                    }
                    break;
                case TrainingType.STAMINA:
                    if (stats.MaxStamina >= stats.StaminaCap) return new(Status.STATATCAP, stats);
                    stats.StaminaTraining += (0.1 * intensity);
                    if (stats.StaminaTraining >= 1.0)
                    {
                        int staminaIncrease = (int)(stats.StaminaTraining);
                        stats.MaxStamina += staminaIncrease;
                        stats.Stamina += staminaIncrease;
                        stats.StaminaTraining -= staminaIncrease;
                    }
                    break;
                case TrainingType.HUNGER:
                    if (stats.MaxHunger >= stats.HungerCap) return new(Status.STATATCAP, stats);
                    stats.HungerTraining += (2.0 * intensity);
                    if (stats.HungerTraining >= 1.0)
                    {
                        int hungerIncrease = (int)(stats.HungerTraining);
                        stats.MaxHunger += hungerIncrease;
                        stats.Hunger += (hungerIncrease/2);
                        stats.HungerTraining -= hungerIncrease;
                    }
                    break;
                case TrainingType.STRENGTH:
                    if (stats.Strength >= stats.StrengthCap) return new(Status.STATATCAP, stats);
                    stats.StrengthTraining += (0.2 * intensity);
                    if (stats.StrengthTraining >= 1.0)
                    {
                        int strengthIncrease = (int)(stats.StrengthTraining);
                        stats.Strength += strengthIncrease;
                        stats.StrengthTraining -= strengthIncrease;
                    }
                    break;
                case TrainingType.SPEED:
                    if (stats.Speed >= stats.SpeedCap) return new(Status.STATATCAP, stats);
                    stats.SpeedTraining += (0.2 * intensity);
                    if (stats.SpeedTraining >= 1.0)
                    {
                        int speedIncrease = (int)(stats.SpeedTraining);
                        stats.Speed += speedIncrease;
                        stats.SpeedTraining -= speedIncrease;
                    }
                    break;
                default:
                    break;
            }
            stats.Stamina -= 1;
            slime.SlimeStats = stats;
            slime.Price = CalculatePrice(stats, (int)stats.Rarity);

            return new(Status.SUCCESS, UpdateStatus(slime).SlimeStats);
        }

        public Tuple<Status, int> FeedSlime(SlimeFeeder slimeFeeder)
        {
            Slime? slime = SlimeRepository.GetById(slimeFeeder.SlimeId);
            if (slime == null) return new(Status.SLIMENOTFOUND, -1);

            if (slimeFeeder.OwnerId != slime.OwnerId) return new(Status.NOTOWN, -1);

            SlimeStats stats = slime.SlimeStats;
            stats.Hunger = Math.Min(stats.MaxHunger, stats.Hunger + slimeFeeder.Food);
            if (stats.Hunger >= stats.MaxHunger)
            {
                stats.Health = Math.Max(0, stats.Health - slimeFeeder.Food);
            }
            slime.SlimeStats = stats;

            return new(Status.SUCCESS, UpdateStatus(slime).SlimeStats.Hunger);
        }

        public Slime? UpdateSlime(SlimeEditable updatedSlime)
        {
            Slime? slime = SlimeRepository.GetById(updatedSlime.Id);
            if (slime == null) return null;

            slime.Name = updatedSlime.Name;
            slime.IsOnMarket = updatedSlime.IsOnMarket;
            slime.OwnerId = updatedSlime.OwnerId;

            return UpdateStatus(slime);
        }


        public Slime CreateRandomSlime(int? ownerId = null)
        {
            Random r = new();

            string[] randomNames = ["Slime", "Oozy", "Blip", "Slimo", "Goop", "Glub", "Goomy", "Slimon", "Slimy"];
            string name = randomNames[r.Next(randomNames.Length)];

            int size = r.Next(0, 2);
            int rarityIndex = r.Next(0, 3);
            Rarity rarity = (Rarity)rarityIndex;
            string[] colors = ["#30aa49", "#006e51", "#92b6d5"];
            string color = colors[rarityIndex];

            bool isonmarket = ownerId <= 3 && ownerId > 0;

            int id = SlimeRepository.GetAll().Count;

            SlimeStats stats = GenerateStats(id, rarity);

            Slime slime = new(id, name, size, color, isonmarket,
                              CalculatePrice(stats, rarityIndex), ownerId, stats
            );

            slime.Svg = SlimeSvg.PrepareSvg(slime);

            SlimeRepository.Add(slime);
            return slime;
        }


        //public Slime CreateGeneticSlime(List<Slime> slimes) { }


        private Slime UpdateStatus(Slime slime)
        {
            DateTime now = DateTime.UtcNow;
            TimeSpan timeElapsed = now - slime.LastUpdated;

            int hungerDecrease = (int)(timeElapsed.TotalMinutes / 10);
            int staminaRegain = (int)(timeElapsed.TotalMinutes / 5);
            int ageIncrease = (int)(timeElapsed.TotalMinutes / 60);

            SlimeStats slimeStats = slime.SlimeStats;

            slimeStats.Hunger = Math.Max(0, slimeStats.Hunger - hungerDecrease);
            slimeStats.Stamina = Math.Min(slimeStats.MaxStamina, slimeStats.Stamina + staminaRegain);
            slime.SlimeStats = slimeStats;
            slime.Age += ageIncrease;
            slime.LastUpdated = now;

            SlimeRepository.Update(slime);
            return slime;
        }

        private static SlimeStats GenerateStats(int id, Rarity rarity = Rarity.COMMON)
        {
            StatRolls healthRolls = new();
            StatRolls staminaRolls = new();
            StatRolls hungerRolls = new();
            StatRolls strengthRolls = new();
            StatRolls speedRolls = new();

            int healthCapAdditive = 10;
            int staminaCapAdditive = 2;
            int hungerCapAdditive = 10;
            int strengthCapAdditive = 3;
            int speedCapAdditive = 3;

            switch (rarity)
            {
                case Rarity.UNCOMMON:
                    healthRolls.AddRolls([9, 10, 11, 12], [0.3, 0.6, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.75, 0.9, 1]);
                    hungerRolls.AddRolls([8, 9, 10, 11, 12], [0.3, 0.5, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.85, 0.95, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.85, 0.95, 1]);
                    healthCapAdditive += 2;
                    staminaCapAdditive += 1;
                    hungerCapAdditive += 2;
                    strengthCapAdditive += 1;
                    speedCapAdditive += 1;
                    break;

                case Rarity.SPECIAL:
                    healthRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.6, 0.8, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.7, 0.85, 1]);
                    hungerRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    healthCapAdditive += 7;
                    staminaCapAdditive += 2;
                    hungerCapAdditive += 7;
                    strengthCapAdditive += 3;
                    speedCapAdditive += 3;
                    break;

                case Rarity.RARE:
                    healthRolls.AddRolls([12, 13, 14, 15, 16, 17], [0.1, 0.2, 0.4, 0.6, 0.8, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([12, 13, 14, 15, 16, 17], [0.1, 0.2, 0.4, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.7, 0.9, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.7, 0.9, 1]);
                    healthCapAdditive += 12;
                    staminaCapAdditive += 4;
                    hungerCapAdditive += 12;
                    strengthCapAdditive += 5;
                    speedCapAdditive += 5;
                    break;

                case Rarity.EXOTIC:
                    healthRolls.AddRolls([14, 15, 16, 17, 18, 19, 20], [0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([14, 15, 16, 17, 18, 19, 20], [0.1, 0.2, 0.4, 0.7, 0.9, 0.95, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.6, 0.8, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.6, 0.8, 1]);
                    healthCapAdditive += 15;
                    staminaCapAdditive += 5;
                    hungerCapAdditive += 15;
                    strengthCapAdditive += 6;
                    speedCapAdditive += 6;
                    break;

                case Rarity.LEGENDARY:
                    healthRolls.AddRolls([19, 20, 21, 22, 23, 24, 25], [0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([19, 20, 21, 22, 23, 24, 25], [0.1, 0.4, 0.6, 0.8, 0.92, 0.97, 1]);
                    strengthRolls.AddRolls([2, 3, 4], [0.6, 0.9, 1]);
                    speedRolls.AddRolls([2, 3, 4], [0.6, 0.9, 1]);
                    healthCapAdditive += 20;
                    staminaCapAdditive += 7;
                    hungerCapAdditive += 20;
                    strengthCapAdditive += 8;
                    speedCapAdditive += 8;
                    break;

                case Rarity.MYTHIC:
                    healthRolls.AddRolls([25, 26, 27, 28, 29, 30], [0.1, 0.3, 0.5, 0.7, 0.9, 1]);
                    staminaRolls.AddRolls([2, 3, 4], [0.5, 0.9, 1]);
                    hungerRolls.AddRolls([25, 26, 27, 28, 29, 30], [0.1, 0.4, 0.6, 0.8, 0.92, 1]);
                    strengthRolls.AddRolls([2, 3, 4], [0.4, 0.8, 1]);
                    speedRolls.AddRolls([2, 3, 4], [0.4, 0.8, 1]);
                    healthCapAdditive += 30;
                    staminaCapAdditive += 10;
                    hungerCapAdditive += 30;
                    strengthCapAdditive += 10;
                    speedCapAdditive += 10;
                    break;

                case Rarity.GODLIKE:
                    healthRolls.AddRolls([35, 36, 37, 38, 39, 40], [0.15, 0.35, 0.55, 0.75, 0.95, 1]);
                    staminaRolls.AddRolls([2, 3, 4, 5], [0.3, 0.6, 0.9, 1]);
                    hungerRolls.AddRolls([35, 36, 37, 38, 39, 40], [0.15, 0.45, 0.65, 0.85, 0.97, 1]);
                    strengthRolls.AddRolls([2, 3, 4, 5], [0.4, 0.7, 0.97, 1]);
                    speedRolls.AddRolls([2, 3, 4, 5], [0.4, 0.7, 0.97, 1]);
                    healthCapAdditive += 40;
                    staminaCapAdditive += 15;
                    hungerCapAdditive += 40;
                    strengthCapAdditive += 15;
                    speedCapAdditive += 15;
                    break;


                case Rarity.COMMON:
                default:
                    healthRolls.AddRolls([8, 9, 10, 11], [0.4, 0.7, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.8, 0.95, 1]);
                    hungerRolls.AddRolls([7, 8, 9, 10, 11], [0.3, 0.5, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2], [0.9, 1]);
                    speedRolls.AddRolls([1, 2], [0.9, 1]);
                    break;
            }


            Random r = new();
            double healthRoll = r.NextDouble();
            double staminaRoll = r.NextDouble();
            double hungerRoll = r.NextDouble();
            double strengthRoll = r.NextDouble();
            double speedRoll = r.NextDouble();

            int health = healthRolls.CalculateStat(healthRoll);
            int stamina = staminaRolls.CalculateStat(staminaRoll);
            int hunger = hungerRolls.CalculateStat(hungerRoll);
            int strength = strengthRolls.CalculateStat(strengthRoll);
            int speed = speedRolls.CalculateStat(speedRoll);

            return new(
                id,
                health,
                health + healthCapAdditive,
                stamina,
                stamina + staminaCapAdditive,
                hunger,
                hunger + hungerCapAdditive,
                strength,
                strength + strengthCapAdditive,
                speed,
                speed + speedCapAdditive,
                rarity
                );
        }

        private static int CalculatePrice(SlimeStats stats, int rarityIndex)
        {
            return ((((100 + (stats.MaxHealth + stats.MaxHunger)) * stats.Strength) * stats.Speed) * stats.MaxStamina) * (rarityIndex + 1);
        }

    }
}
