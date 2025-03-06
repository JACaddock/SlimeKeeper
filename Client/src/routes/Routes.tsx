import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Play from "../pages/Play";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/play",
                element: (
                    <ProtectedRoute>
                        <Play />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                )
            },
            {
                path: "/register",
                element: (
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                )
            }
        ],
    },
]);