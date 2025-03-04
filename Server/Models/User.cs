using System.Diagnostics.CodeAnalysis;

namespace Server.Models
{
    public class User
    {
        // Personal details
        public static int Total { get; set; }
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public bool IsVerified { get; set; } = false;
        public required string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsAdmin { get; set; } = false;

        // Account details
        public int Gold { get; set; } = 0;
        public List<Slime> Slimes { get; set; } = [];
        public int[] Friends { get; set; } = [];


        [SetsRequiredMembers]
        public User(string username, string email, string password)
        {
            Id = Total;
            Total++;
            Username = username;
            Email = email;
            Password = password;

            GenerateRandomDetails();
        }
        
        public void GenerateRandomDetails()
        {
            Random r = new();
            int rInt = r.Next(0, 5000);
            Gold = rInt;

            rInt = r.Next(1, 4);
            for (int i = 0; i < rInt; i++)
            {
                Slimes.Add(Slime.GenerateRandomSlime(Id));
            }
        }
    }
}
