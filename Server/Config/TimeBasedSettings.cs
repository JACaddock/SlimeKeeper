namespace Server.Config
{
    public class TimeBasedSettings
    {
        public int StaminaRegenAmount { get; set; }
        public double StaminaRegenIntervalHours { get; set; }
        public int HungerDepletionAmount { get; set; }
        public int HungerDepletionIntervalHours { get; set; }
        public double HungerDepletionMinThreshold { get; set; }
        public int AgeIncreaseAmount { get; set; }
        public int AgeIncreaseIntervalHours { get; set; }
    }
}
