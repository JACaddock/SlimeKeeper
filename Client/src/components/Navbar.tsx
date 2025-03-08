import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SlimeLogo from '../assets/slime.png';
import { useEffect } from 'react';
import { useAccount } from '../hooks/useAccount';



const Navbar = () => {
    const { isLoggedIn, user, logout, isUserValid } = useAuth();
    const { getGold } = useAccount();

    useEffect(() => {
        isUserValid();
    }, [isUserValid])

    return (
        <nav>
            <div className="nav-row">
                <div className="nav-column nav-logo">
                    <Link to="/">
                        <img src={SlimeLogo} alt="Logo of Slime" className="logo" />
                    </Link>
                </div>

                <div className="justify-end">
                    <div>
                        <Link to="/">
                            <h2 className="title">Slime Keeper Online</h2>
                        </Link>
                    </div>
                    <div className="nav-row link-row">
                        <Link to="/play">Play</Link>
                        <Link to="/market">Market</Link>
                        <Link to="/users">Users</Link>
                    </div>
                </div>

                {isLoggedIn() ? (
                    <div className="nav-column">
                        <Link to={"/user/" + user?.id}>{user?.username}</Link>
                        <p>Gold: {getGold()}</p>
                        <a onClick={logout}>Logout</a>
                    </div>
                ) : (

                    <div className="nav-column">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;