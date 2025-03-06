using Server.Models;

namespace Server.Controllers.Listener
{
    public interface IUserListener
    {
        void OnUserRegistered(User user);
    }
}
