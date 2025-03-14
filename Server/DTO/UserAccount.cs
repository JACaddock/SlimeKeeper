using Server.Models;

namespace Server.DTO
{
    public class UserAccount(int id, string username, bool is_admin, int gold, List<SlimeDTO> slimes, int[] friends)
    {
        public int Id { get; set; } = id;
        public string Username { get; set; } = username;
        public bool IsAdmin { get; set; } = is_admin;
        public int Gold { get; set; } = gold;
        public List<SlimeDTO> Slimes { get; set; } = slimes;
        public int[] Friends { get; set; } = friends;
    }
}
