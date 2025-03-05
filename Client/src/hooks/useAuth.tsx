import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserUnique } from '../types/User';
import axios from "axios";

const UserContext = createContext<UserAuth>({} as UserAuth);

type Props = { children: React.ReactNode };

const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserUnique | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

/*    const registerUser = async (
        email: string,
        username: string,
        password: string
    ) => {
        await registerAPI(email, username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        userName: res?.data.userName,
                        email: res?.data.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    navigate("/search");
                }
            })
            .catch((e) => alert("Server error occured"));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        userName: res?.data.userName,
                        email: res?.data.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Login Success!");
                    navigate("/search");
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    };*/

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    const registerUser = () => { };

    const loginUser = () => { };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useAuth = () => useContext(UserContext);