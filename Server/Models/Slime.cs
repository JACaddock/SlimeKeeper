namespace Server.Models
{
    enum SlimePart
    {
        BODY,
        MOUTH,
        EYE1,
        IRIS1,
        EYE2,
        IRIS2,
        CHILDBODY
    }

    public enum Rarity
    {
        COMMON,     // White
        UNCOMMON,   // Grey
        SPECIAL,    // Blue
        RARE,       // Green
        EXOTIC,     // Purple
        LEGENDARY,  // Yellow
        MYTHIC,     // Orange
        GODLIKE     // Red
    }

    public class Slime
    {
        public static int Total { get; set; }
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Svg { get; set; }
        public int Size { get; set; }
        public string? Color { get; set; }
        public int Age { get; set; } = 1;
        public bool IsOnMarket { get; set; } = false;
        public int Price { get; set; }

        public int? OwnerId { get; set; }

        //public Rarity Rarity { get; set; } = Rarity.COMMON;

        // Stats
        public SlimeStats? SlimeStats { get; set; }


        // Slime Constructor that takes a list of slimes
        //public Slime(List<Slime> slimes) {}

        public Slime(int? ownerid = null)
        {
            Id = Total;
            Total++;
            OwnerId = ownerid;
            Age = 0;
            IsOnMarket = ownerid > 0 && ownerid <= 3;

            Random r = new();
            Size = r.Next(0, 2);
            Price = r.Next(0, 5000);

            int rNameIndex = r.Next(0, 9);
            string[] rName = [
                "Slime", "Oozy", "Blip", "Slimo", "Goop", "Glub", "Goony", "Slemon", "Slimy"
            ];
            Name = rName[rNameIndex];

            Rarity rRarity = (Rarity)r.Next(0, 3);

            string[] rColor = ["#30aa49", "#006e51", "#92b6d5"];
            Color = rColor[(int)rRarity];

            Svg = PrepareSvg();

            SlimeStats = new(Id, rRarity);
        }

        public Slime(string name, int price, int size, string color, bool isonmarket, int age = 1)
        {
            Id = Total;
            Total++;
            Name = name;
            Price = price;
            IsOnMarket = isonmarket;

            if (size < 0) Size = 0;
            else if (size > 5) Size = 5;
            else Size = size;

            Age = age;
            
            Color = color;
            Svg = PrepareSvg();
        }

        private string PrepareSvg()
        {
            string workingSvg = @"
                <svg xmlns='http://www.w3.org/2000/svg' 
                    style='background: transparent; background-color: transparent; color-scheme: light dark;'
                    version='1.1' width='100px' height='100px'";

            if (Age > 0)
            {
                workingSvg += "viewBox='-0.5 -0.5 31 21'>";
                workingSvg += PrepareAdultSvg();
            }
            else
            {
                workingSvg += "viewBox='-10 -5 31 21'>";
                workingSvg += PrepareChildSvg();
            }

            workingSvg += "</svg>";
            return workingSvg;
        }

        private string PrepareAdultSvg()
        {
            string workingSvg = "";

            // Body
            workingSvg += "<ellipse id='body' cx='15' cy='10' "
                       + CalculatePartSize(SlimePart.BODY)
                       + " fill='" + Color
                       + "' stroke='#000000' stroke-width='0.2' />";

            // Mouth
            workingSvg += "<path id='mouth' "
                       + CalculatePartSize(SlimePart.MOUTH)
                       + " fill='#ff8000' stroke='#000000' stroke-width='0.5' transform='rotate(90,15,15)' />";

            // Left Eye
            workingSvg += "<circle id='eye1' "
                       + CalculatePartSize(SlimePart.EYE1)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";
            // Left Iris
            workingSvg += "<circle id='iris1' "
                       + CalculatePartSize(SlimePart.IRIS1)
                       + " fill='#000000' stroke='none' />";

            // Right Eye
            workingSvg += "<circle id='eye2' "
                       + CalculatePartSize(SlimePart.EYE2)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";

            // Right Iris
            workingSvg += "<circle id='iris2' "
                       + CalculatePartSize(SlimePart.IRIS2)
                       + " fill ='#000000' stroke='none' />";

            return workingSvg;
        } 

        private string PrepareChildSvg()
        {
            string workingSvg = "";

            // Body
            workingSvg += "<circle id='body' "
                       + CalculatePartSize(SlimePart.CHILDBODY)
                       + " fill='" + Color 
                       + "' stroke='#000000' stroke-width='0.2' />";

            // Left Iris
            workingSvg += "<circle id='iris1' "
                       + "cx='3' cy='4' r='1'" 
                       + " fill='#000000"
                       + "' stroke='none' />";

            // Right Iris
            workingSvg += "<circle id='iris2' "
                       + "cx='7' cy='4' r='1'"
                       + " fill='#000000"
                       + "' stroke='none' />";

            return workingSvg;
        }

        private string CalculatePartSize(SlimePart bodyPart)
        {
            switch (bodyPart)
            {
                case SlimePart.BODY:
                    return "rx='" + (10 + Size) + "' ry='" + (8 + Size) + "'";

                case SlimePart.MOUTH:
                    if (Size < 3)
                    {
                        return "d='M 12 10 Q 15 10 15 15 Q 15 20 12 20 Q 15 15 12 10 Z'";
                    }
                    return "d='M 13 9 Q 17 9 17 15 Q 17 21 13 21 Q 15 15 13 9 Z'";

                case SlimePart.EYE1:
                    if (Size < 3)
                    {
                        return "cx='12' cy='8' r='1.8'";
                    }
                    return "cx='11' cy='8' r='2'";

                case SlimePart.IRIS1:
                    if (Size < 3)
                    {
                        return "cx='12' cy='8' r='0.9'";
                    }
                    return "cx='11' cy='8' r='1'";

                case SlimePart.EYE2:
                    if (Size < 3)
                    {
                        return "cx='18' cy='8' r='1.8'";
                    }
                    return "cx='19' cy='8' r='2'";

                case SlimePart.IRIS2:
                    if (Size < 3)
                    {
                        return "cx='18' cy='8' r='0.9'";
                    }
                    return "cx='19' cy='8' r='1'";

                case SlimePart.CHILDBODY:
                    return "cx='5' cy='5' r='" + (5 + (Size / 2)) + "'";

                default:
                    return "";
            }
        }
    }


    public class SlimeStats
    {
        public int Id { get; set; }
        public int Health { get; set; }
        public int MaxHealth { get; set; } 
        public int Stamina { get; set; } 
        public int MaxStamina { get; set; }
        public int Hunger { get; set; } 
        public int MaxHunger { get; set; } 
        public int Strength { get; set; } 
        public int Speed { get; set; }
        public Rarity Rarity { get; set; }

        public SlimeStats(int id, Rarity rarity = Rarity.COMMON)
        {
            Id = id;
            Rarity = rarity;

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

            Health = healthRolls.CalculateStat(healthRoll);
            MaxHealth = Health;
            Stamina = staminaRolls.CalculateStat(staminaRoll);
            MaxStamina = Stamina;
            MaxHunger = hungerRolls.CalculateStat(hungerRoll);
            Hunger = MaxHunger / 2;
            Strength = strengthRolls.CalculateStat(strengthRoll);
            Speed = speedRolls.CalculateStat(speedRoll);
        }
    }


    public class EditableSlime(int id, string name, bool isonmarket, int ownerid)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public bool IsOnMarket { get; set; } = isonmarket;
        public int OwnerId { get; set; } = ownerid;

    }


    public class StatRolls()
    {
        private List<int> Stats { get; set; } = [];
        private List<double> Rolls { get; set; } = [];


        public void AddRoll(int stat, double roll)
        {
            Stats.Add(stat);
            Rolls.Add(roll);
        }

        public void AddRolls(List<int> stats, List<double> rolls)
        {
            if (stats.Count == rolls.Count)
            {
                for (int i = 0; i < stats.Count; i++)
                {
                    AddRoll(stats[i], rolls[i]);
                }
            }
        }

        public int CalculateStat(double roll)
        {
            for (int i = 0; i < Rolls.Count; i++)
            {
                if (roll <= Rolls[i])
                {
                    return Stats[i];
                }
            }
            return Stats[-1];
        }
    }
}
