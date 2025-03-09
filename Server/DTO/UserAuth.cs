namespace Server.DTO
{
    public class UserAuth(UserUnique unique, string token)
    {
        public UserUnique Unique { get; set; } = unique;
        public string Token { get; set; } = token;
    }
}
