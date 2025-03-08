import { createContext, useContext } from "react";
import { UserAccountContext } from "../types/User";

export const AccountContext = createContext<UserAccountContext>({} as UserAccountContext);

export const useAccount = () => useContext(AccountContext);