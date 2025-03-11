import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import UserProvider from "./context/AuthProvider";
import AccountProvider from "./context/AccountProvider";
import TimeBasedProvider from "./context/TimeBasedProvider";


const App = () => {
    return (
        <>
            <UserProvider>
                <AccountProvider>
                    <TimeBasedProvider>
                        <Navbar />
                        <Outlet />
                    </TimeBasedProvider>
                </AccountProvider>
            </UserProvider>
        </>
    )
};

export default App;