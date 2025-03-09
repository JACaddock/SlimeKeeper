using System.Diagnostics.CodeAnalysis;

namespace Server.Models
{
    [method: SetsRequiredMembers]
    public class User(int id, string username, string email, string password, List<int> ownedSlimes)
    {
        // Personal details
        public int Id { get; set; } = id;
        public required string Username { get; set; } = username;
        public required string Email { get; set; } = email;
        public bool IsVerified { get; set; } = false;
        public required string Password { get; set; } = password;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsAdmin { get; set; } = false;

        // Account details
        public int Gold { get; set; } = 200;
        public List<int> OwnedSlimes { get; set; } = ownedSlimes;
        public int[] Friends { get; set; } = [];
        public DateTime LastClaimedDaily { get; set; } = DateTime.UtcNow;
    }
}
