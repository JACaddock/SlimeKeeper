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
        public bool ClaimedDaily { get; set; } = false;


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

            rInt = r.Next(1, 6);
            for (int i = 0; i < rInt; i++)
            {
                Slimes.Add(new(Id));
            }
        }
    }

    public class UserId(int id)
    {
        public int Id { get; set; } = id;
    }


    [method: SetsRequiredMembers]
    public class UserUnique(int id, string username, string email)
    {
        public int Id { get; set; } = id;
        public required string Username { get; set; } = username;
        public required string Email { get; set; } = email;
    }


    [method: SetsRequiredMembers]
    public class UserCredentials(int id, string username, string email, string password)
    {
        public int Id { get; set; } = id;
        public string Username { get; set; } = username;
        public string Email { get; set; } = email;
        public required string Password { get; set; } = password;
    }

    public class UserAuth(UserUnique unique, string token)
    {
        public UserUnique Unique { get; set; } = unique;
        public string Token { get; set; } = token;
    }

    public class UserAccount(int id, string username, bool is_admin, int gold, List<Slime> slimes, int[] friends)
    {
        public int Id { get; set; } = id;
        public string Username { get; set; } = username;
        public bool IsAdmin { get; set; } = is_admin;
        public int Gold { get; set; } = gold;
        public List<Slime> Slimes { get; set; } = slimes;
        public int[] Friends { get; set; } = friends;
    }

    public class UserTransaction(int sellerid, int buyerid, int slimeid)
    {
        public int SellerId { get; set; } = sellerid;
        public int BuyerId { get; set; } = buyerid;
        public int SlimeId { get; set; } = slimeid;
    }
}
