import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SlimeLogo from '../assets/slime.png';



const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <nav>
            <div className="flex-column">
                <Link to="/">
                    <img src={SlimeLogo} alt="Logo of Slime" className="logo" />
                </Link>
            </div>

            <div>
                <Link to="/">
                    <h2 className="title">Slime Keeper Online</h2>
                </Link>
            </div>

            {isLoggedIn() ? (
                <div className="flex-column">
                    <button>{user?.username}</button>
                    <a onClick={logout}>Logout</a>
                </div>
            ): (

                <div className="flex-column">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;