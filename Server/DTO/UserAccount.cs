using Server.Models;

namespace Server.DTO
{
    public class UserAccount
    {
        public UserAccount() { }

        public UserAccount(int id, string username, bool isAdmin, int gold, List<SlimeDTO> slimes, int[] friends)
        {
            Id = id;
            Username = username;
            IsAdmin = isAdmin;
            Gold = gold;
            Slimes = slimes;
            Friends = friends;
        }

        public int Id { get; set; }
        public string Username { get; set; } = "";
        public bool IsAdmin { get; set; }
        public int Gold { get; set; }
        public List<SlimeDTO> Slimes { get; set; } = [];
        public int[] Friends { get; set; } = [];
    }
}
