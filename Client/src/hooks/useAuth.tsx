import { createContext, useContext } from "react";
import { UserAuth } from "../types/User";

export const AuthContext = createContext<UserAuth>({} as UserAuth);

export const useAuth = () => useContext(AuthContext);