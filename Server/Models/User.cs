using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Server.Models
{
    public class User
    {
        public User() { }

        [SetsRequiredMembers]
        public User(string username, string email, string password)
        {
            Username = username;
            Email = email;
            Password = password;
        }

        [Key] public int Id { get; set; }
        public required string Username { get; set; } 
        public required string Email { get; set; } 
        public bool IsVerified { get; set; } = false;
        public required string Password { get; set; } 
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsAdmin { get; set; } = false;
        public int Gold { get; set; } = 200;
        public virtual List<Slime> OwnedSlimes { get; set; } = [];
        [ForeignKey("User")] public int[] Friends { get; set; } = [];
        public DateTime LastClaimedDaily { get; set; } = DateTime.UtcNow;
    }
}
