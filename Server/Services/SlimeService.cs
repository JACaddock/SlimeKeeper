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
                UpdateSlimeStatus(slime);
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


        public bool UpdateSlime(EditableSlime updatedSlime)
        {
            Slime? slime = SlimeRepository.GetById(updatedSlime.Id);
            if (slime == null) return false;

            slime.Name = updatedSlime.Name;
            slime.IsOnMarket = updatedSlime.IsOnMarket;
            slime.OwnerId = updatedSlime.OwnerId;

            SlimeRepository.Update(slime);
            return true;
        }


        public Slime CreateRandomSlime(int? ownerId = null)
        {
            Random r = new();

            string[] randomNames = ["Slime", "Oozy", "Blip", "Slimo", "Goop", "Glub", "Goony", "Slemon", "Slimy"];
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

        private void UpdateSlimeStatus(Slime slime)
        {
            DateTime now = DateTime.UtcNow;
            TimeSpan timeElapsed = now - slime.LastUpdated;

            int hungerDecrease = (int)(timeElapsed.TotalMinutes / 10);
            int staminaRegain = (int)(timeElapsed.TotalMinutes / 5);

            SlimeStats slimeStats = slime.SlimeStats;

            slimeStats.Hunger = Math.Max(0, slimeStats.Hunger - hungerDecrease);
            slimeStats.Stamina = Math.Min(slimeStats.MaxStamina, slimeStats.Stamina + staminaRegain);
            slime.SlimeStats = slimeStats;
            slime.LastUpdated = now;

            SlimeRepository.Update(slime);
        }

        private static SlimeStats GenerateStats(int id, Rarity rarity = Rarity.COMMON)
        {
            StatRolls healthRolls = new();
            StatRolls staminaRolls = new();
            StatRolls hungerRolls = new();
            StatRolls strengthRolls = new();
            StatRolls speedRolls = new();

            switch (rarity)
            {
                case Rarity.COMMON:
                    healthRolls.AddRolls([8, 9, 10, 11], [0.4, 0.7, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.8, 0.95, 1]);
                    hungerRolls.AddRolls([7, 8, 9, 10, 11], [0.3, 0.5, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2], [0.9, 1]);
                    speedRolls.AddRolls([1, 2], [0.9, 1]);
                    break;

                case Rarity.UNCOMMON:
                    healthRolls.AddRolls([9, 10, 11, 12], [0.3, 0.6, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.75, 0.9, 1]);
                    hungerRolls.AddRolls([8, 9, 10, 11, 12], [0.3, 0.5, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.85, 0.95, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.85, 0.95, 1]);
                    break;

                case Rarity.SPECIAL:
                    healthRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.6, 0.8, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.7, 0.85, 1]);
                    hungerRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    break;

                case Rarity.RARE:
                    healthRolls.AddRolls([12, 13, 14, 15, 16, 17], [0.1, 0.2, 0.4, 0.6, 0.8, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([12, 13, 14, 15, 16, 17], [0.1, 0.2, 0.4, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.7, 0.9, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.7, 0.9, 1]);
                    break;

                case Rarity.EXOTIC:
                    healthRolls.AddRolls([14, 15, 16, 17, 18, 19, 20], [0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([14, 15, 16, 17, 18, 19, 20], [0.1, 0.2, 0.4, 0.7, 0.9, 0.95, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.6, 0.8, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.6, 0.8, 1]);
                    break;

                case Rarity.LEGENDARY:
                    healthRolls.AddRolls([19, 20, 21, 22, 23, 24, 25], [0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 1]);
                    staminaRolls.AddRolls([1, 2, 3, 4], [0.3, 0.65, 0.98, 1]);
                    hungerRolls.AddRolls([19, 20, 21, 22, 23, 24, 25], [0.1, 0.4, 0.6, 0.8, 0.92, 0.97, 1]);
                    strengthRolls.AddRolls([2, 3, 4], [0.6, 0.9, 1]);
                    speedRolls.AddRolls([2, 3, 4], [0.6, 0.9, 1]);
                    break;

                case Rarity.MYTHIC:
                    healthRolls.AddRolls([25, 26, 27, 28, 29, 30], [0.1, 0.3, 0.5, 0.7, 0.9, 1]);
                    staminaRolls.AddRolls([2, 3, 4], [0.5, 0.9, 1]);
                    hungerRolls.AddRolls([25, 26, 27, 28, 29, 30], [0.1, 0.4, 0.6, 0.8, 0.92, 1]);
                    strengthRolls.AddRolls([2, 3, 4], [0.4, 0.8, 1]);
                    speedRolls.AddRolls([2, 3, 4], [0.4, 0.8, 1]);
                    break;

                case Rarity.GODLIKE:
                    healthRolls.AddRolls([35, 36, 37, 38, 39, 40], [0.15, 0.35, 0.55, 0.75, 0.95, 1]);
                    staminaRolls.AddRolls([2, 3, 4, 5], [0.3, 0.6, 0.9, 1]);
                    hungerRolls.AddRolls([35, 36, 37, 38, 39, 40], [0.15, 0.45, 0.65, 0.85, 0.97, 1]);
                    strengthRolls.AddRolls([2, 3, 4, 5], [0.4, 0.7, 0.97, 1]);
                    speedRolls.AddRolls([2, 3, 4, 5], [0.4, 0.7, 0.97, 1]);
                    break;

                default:
                    healthRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.6, 0.8, 1]);
                    staminaRolls.AddRolls([1, 2, 3], [0.7, 0.85, 1]);
                    hungerRolls.AddRolls([10, 11, 12, 13, 14, 15], [0.1, 0.2, 0.4, 0.7, 0.9, 1]);
                    strengthRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    speedRolls.AddRolls([1, 2, 3], [0.8, 0.92, 1]);
                    break;
            }


            Random r = new();
            double healthRoll = r.NextDouble();
            double staminaRoll = r.NextDouble();
            double hungerRoll = r.NextDouble();
            double strengthRoll = r.NextDouble();
            double speedRoll = r.NextDouble();

            return new(
                id,
                healthRolls.CalculateStat(healthRoll),
                staminaRolls.CalculateStat(staminaRoll),
                hungerRolls.CalculateStat(hungerRoll),
                strengthRolls.CalculateStat(strengthRoll),
                speedRolls.CalculateStat(speedRoll),
                rarity
                );
        }

        private static int CalculatePrice(SlimeStats stats, int rarityIndex)
        {
            return ((((100 + (stats.MaxHealth + stats.MaxHunger)) * stats.Strength) * stats.Speed) * stats.Stamina) * (rarityIndex + 1);
        }

    }
}
