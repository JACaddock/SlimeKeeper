import { Outlet } from "react-router";
import Navbar from "./components/Navbar";


const App = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default App;