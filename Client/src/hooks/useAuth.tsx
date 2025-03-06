import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserUnique } from '../types/User';
import axios from "axios";

const UserContext = createContext<UserAuth>({} as UserAuth);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
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

    function loginUser(username: string, password: string) {
        axios.post("/api/user/login/", {
            email: "",
            username: username,
            password: password
        })
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("token", response?.data.token);
                    const userUnique: UserUnique = response.data.unique;
                    localStorage.setItem("user", JSON.stringify(userUnique));
                    setToken(response.data.token!);
                    setUser(userUnique);
                    navigate("/");
                }
                else {
                    alert("Username/Password is incorrect")
                }
            })
            .catch((e) => alert("Server error occured: " + e));
    };

    function registerUser(email: string, username: string, password: string) {
        axios.post("/api/user/register/", {
            email: email,
            username: username,
            password: password
        })
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("token", response?.data.token);
                    const userUnique: UserUnique = response.data.unique;
                    localStorage.setItem("user", JSON.stringify(userUnique));
                    setToken(response.data.token!);
                    setUser(userUnique);
                    navigate("/");
                }
                else {
                    alert("Email/Username is already in use")
                }
            })
            .catch((e) => alert("Server error occured: " + e));
    };

    

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

    return (
        <UserContext.Provider
            value={{ user, token, logout, isLoggedIn, loginUser, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useAuth = () => useContext(UserContext);