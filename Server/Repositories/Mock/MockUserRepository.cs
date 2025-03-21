﻿using Server.DTO;
using Server.Models;

namespace Server.Repositories.Mock
{
    public class MockUserRepository : IUserRepository
    {
        private readonly List<User> Users = [
            new("johnny151", "johnny151@gmail.com", "password123"),
            new("janeDoe", "janedoe@gmail.com", "password123"),
            new("adam", "adam@gmail.com", "password123"),
            new("dantheman", "dantheman@gmail.com", "pass1234"),
            new("bradley", "bradley@gmail.com", "1234")
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
