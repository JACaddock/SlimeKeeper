namespace Server.Helpers
{
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
