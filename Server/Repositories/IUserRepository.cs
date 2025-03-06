﻿using Server.Models;

namespace Server.Repositories
{
    public interface IUserRepository
    {
        User? GetById(int id);
        List<User> GetAll();
        List<UserUnique> GetAllUnique();
        User? GetByUsername(string username);
        User? GetByEmail(string email);
        bool AddUser(User user);
        bool DeleteUser(User user);
    }
}
