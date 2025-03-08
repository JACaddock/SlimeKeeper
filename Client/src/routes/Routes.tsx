import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PlayPage from "../pages/PlayPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import SlimePage from "../pages/SlimePage";
import UserPage from "../pages/UserPage";
import ErrorPage from "../pages/ErrorPage";
import UsersPage from "../pages/UsersPage";
import MarketPage from "../pages/MarketPage";

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
                path: "/user/:id",
                element: <UserPage />
            },
            {
                path: "/users",
                element: <UsersPage />
            },
            {
                path: "/slime/:id",
                element: <SlimePage />
            },
            {
                path: "/market",
                element: <MarketPage />
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
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ],
    },
]);