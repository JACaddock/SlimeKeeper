import { Link } from "react-router-dom";
import SlimeLogo from "../assets/slime.png";


const Navbar = () => {
    return (
        <nav>
            <div className="flex-column">
                <Link to="/">
                    <img src={SlimeLogo} />
                </Link>
                <div className="hidden font-bold lg:flex">
                    <Link to="/forecast">Forecast</Link>
                </div>
            </div>

            <div>
                <h2>Slime Keeper Online</h2>
            </div>

            <div className="flex-column">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;