using Server.DTO;
using Server.Models;

namespace Server.Repositories.Mock
{
    public class MockUserRepository : IUserRepository
    {
        private readonly List<User> Users = [
            new(0, "johnny151", "johnny151@gmail.com", "password123", [0, 1, 2, 23, 24]),
            new(1, "janeDoe", "janedoe@gmail.com", "password123", [3, 4, 5, 6, 7, 8]),
            new(2, "adam", "adam@gmail.com", "password123", [9, 10, 11, 12, 13]),
            new(3, "dantheman", "dantheman@gmail.com", "pass1234", [14, 15, 16, 17, 18, 19]),
            new(4, "bradley", "bradley@gmail.com", "1234", [20, 21, 22])
        ];

        public List<User> GetAll()
        {
            return Users;
        }

        public List<UserUnique> GetAllUnique()
        {
            List<UserUnique> uniques = [];
            foreach (var user in Users)
            {
                uniques.Add(new(user.Id, user.Username, user.Email));
            }
            return uniques;
        }

        public User? GetById(int id)
        {
            try
            {
                return Users[id];
            }
            catch (Exception)
            {
                return null;
            }
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

        public bool Add(User user)
        {
            Users.Add(user);
            Console.WriteLine(user.Username);

            try
            {
                User validateExists = Users[user.Id];
                if (validateExists.Username == user.Username)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(User user)
        {
            try
            {
                Users[user.Id] = user;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Delete(User user)
        {
            return Users.Remove(user);
        }
    }
}
