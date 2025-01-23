import { Link } from "react-router-dom";
import SlimeLogo from "../assets/slime.png";


const Navbar = () => {
    return (
        <nav>
            <div className="flex-column">
                <Link to="/">
                    <img src={SlimeLogo} className="logo" />
                </Link>
            </div>

            <div>
                <Link to="/">
                    <h2 className="title">Slime Keeper Online</h2>
                </Link>
            </div>

            <div className="flex-column">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;