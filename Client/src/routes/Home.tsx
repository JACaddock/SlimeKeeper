import { Link } from "react-router-dom";
import MarketLoop from "../components/MarketLoop";
import demo from "../assets/demo.svg";


const Home = () => {

    return (
        <main>
            <h2>Welcome to Slime Keeper!</h2>
            <div>
                <p>Slimes come in many different colours and sizes. <b>Grow</b> and <b>Train</b> your slime so they have the chance to become the best!</p>
                <p><b>Splice</b> together slimes in order to create a whole new slime and diversify your collection.</p>
                <p>Buy and Sell slimes on the <b>Market</b>, do all you can to become the greatest Slime Keeper of all time!</p>
            </div>
            <div className="separator-1"></div>
            <div className="grid-row">
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
            <div className="separator-1"></div>
            <MarketLoop />
            <div className="separator-1"></div>
            <img src={demo} />
            <div className="separator-1"></div>
            <div className="separator-1"></div>
        </main>
    );
};

export default Home;