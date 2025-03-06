import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SlimeLogo from '../assets/slime.png';
import { useEffect } from 'react';



const Navbar = () => {
    const { isLoggedIn, user, logout, isUserValid } = useAuth();

    useEffect(() => {
        isUserValid();
    }, [isUserValid])

    return (
        <nav>
            <div className="nav-column nav-logo">
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
                <div className="nav-column">
                    <Link to={"/user/" + user?.id}><button>{user?.username}</button></Link>
                    <a onClick={logout}>Logout</a>
                </div>
            ): (

                <div className="nav-column">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;