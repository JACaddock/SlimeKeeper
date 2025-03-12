import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MarketLoop from '../components/MarketLoop';


const HomePage = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <main>
            {isLoggedIn() ? (
                <div>
                    <h2>Hello {user?.username}</h2>
                    <h3>How are you today?</h3>
                </div>
            ) : (
                <div>
                    <h2>Welcome to Slime Keeper!</h2>
                    <div>
                        <p>Slimes come in many different colours and sizes. <b>Grow</b> and <b>Train</b> your slime so they have the chance to become the best!</p>
                        <p><b>Splice</b> together slimes in order to create a whole new slime and diversify your collection.</p>
                        <p>Buy and Sell slimes on the <b>Market</b>, do all you can to become the greatest Slime Keeper of all time!</p>
                    </div>
                    <div className="separator-1" />
                    <div className="grid-row">
                    <Link to="/register"><button>Register</button></Link>
                    <Link to="/login"><button>Login</button></Link>
                    </div>
                </div>
            )}

            <div className="separator-1" />
            <MarketLoop />
            <div className="separator-1" />
        </main>
    );
};

export default HomePage;