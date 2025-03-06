import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import UserProvider from "./hooks/useAuth";


const App = () => {
    return (
        <>
            <UserProvider>
                <Navbar />
                <Outlet />
            </UserProvider>
        </>
    )
};

export default App;