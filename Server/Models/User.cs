using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Server.Models
{
    public class User
    {
        public User() { }

        [SetsRequiredMembers]
        public User(int id, string username, string email, string password, List<int> ownedSlimes)
        {
            Id = id;
            Username = username;
            Email = email;
            Password = password;
            OwnedSlimes = ownedSlimes;
        }

        // Personal details
        [Key] public int Id { get; set; }
        public required string Username { get; set; } 
        public required string Email { get; set; } 
        public bool IsVerified { get; set; } = false;
        public required string Password { get; set; } 
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsAdmin { get; set; } = false;

        // Account details
        public int Gold { get; set; } = 200;
        public List<int> OwnedSlimes { get; set; } = [];
        public int[] Friends { get; set; } = [];
        public DateTime LastClaimedDaily { get; set; } = DateTime.UtcNow;
    }
}
