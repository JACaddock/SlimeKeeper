import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import UserProvider from "./context/AuthProvider";
import AccountProvider from "./context/AccountProvider";


const App = () => {
    return (
        <>
            <UserProvider>
                <AccountProvider>
                    <Navbar />
                    <Outlet />
                </AccountProvider>
            </UserProvider>
        </>
    )
};

export default App;