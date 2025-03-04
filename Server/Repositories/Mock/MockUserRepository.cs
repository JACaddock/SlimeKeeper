using Server.Models;

namespace Server.Repositories.Mock
{
    public class MockUserRepository : IUserRepository
    {
        private readonly List<User> Users = [
            new("johnny151", "johnny151@gmail.com", "password123"),
            new("janeDoe", "janedoe@gmail.com", "password123"),
            new("jimmy", "jimmy@gmail.com", "password123"),
            new("dantheman", "dantheman@gmail.com", "pass1234")
        ];

        public List<User> GetAll()
        {
            return Users;
        }

        public User? GetById(int id)
        {
            return Users[id];
        }

        public User? GetByEmail(string email)
        {
            foreach (User user in Users)
            {
                if (user.Email == email)
                {
                    return user;
                }
            }
            return null;
        }

        public User? GetByUsername(string username)
        {
            foreach (User user in Users)
            {
                if (user.Username == username)
                {
                    return user;
                }
            }
            return null;
        }

        public bool AddUser(User user)
        {
            Users.Add(user);
            return true;
        }

        public bool DeleteUser(User user)
        {
            return Users.Remove(user);
        }
    }
}
