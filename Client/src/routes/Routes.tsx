import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import WeatherForecast from "../components/WeatherForecast";
import Home from "../pages/Home";
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
                path: "/forecast",
                element: <WeatherForecast />
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