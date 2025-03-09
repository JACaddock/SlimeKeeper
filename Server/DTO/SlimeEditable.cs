namespace Server.DTO
{
    public class SlimeEditable(int id, string name, bool isonmarket, int ownerid)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public bool IsOnMarket { get; set; } = isonmarket;
        public int OwnerId { get; set; } = ownerid;

    }
}
