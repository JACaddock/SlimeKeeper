import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PlayPage from "../pages/PlayPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import SlimePage from "../pages/SlimePage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "/play",
                element: (
                    <ProtectedRoute>
                        <PlayPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/play/slime/:id",
                element: <SlimePage />
            },
            {
                path: "/login",
                element: (
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                )
            },
            {
                path: "/register",
                element: (
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                )
            }
        ],
    },
]);