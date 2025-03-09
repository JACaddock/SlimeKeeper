namespace Server.DTO
{
    public class UserTransaction(int sellerid, int buyerid, int slimeid)
    {
        public int SellerId { get; set; } = sellerid;
        public int BuyerId { get; set; } = buyerid;
        public int SlimeId { get; set; } = slimeid;
    }
}
