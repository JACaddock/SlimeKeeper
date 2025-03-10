import { useEffect, useState } from "react";
import { AccountContext } from "../hooks/useAccount";
import { UserAccount } from '../types/User';
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [userAccount, setUserAccount] = useState<UserAccount>();

    useEffect(() => {
        if (user != null) {
            axios.get("/api/user/account/" + user.id)
                .then((response) => {
                    setUserAccount(response.data);
                })
        }
    }, [user]);

    const hasEnoughGold = (amount: number) => {
        if (userAccount) {
            return userAccount.gold >= amount;
        }
        return false;
    }

    const changeGold = (amount: number) => {
        if (userAccount) {
            setUserAccount({ ...userAccount, gold: userAccount.gold + amount });
        }
    }

    const isAFriend = (id: number) => {
        if (userAccount) {
            return userAccount.friends.includes(id);
        }
        return false;
    }

    const getGold = () => userAccount?.gold ?? 0;
    const isAdmin = () => userAccount?.is_admin ?? false;
    const getSlimes = () => userAccount?.slimes ?? [];
    const getFriends = () => userAccount?.friends ?? [];


    return (
        <AccountContext.Provider
            value={{ hasEnoughGold, changeGold, isAFriend, getGold, isAdmin, getSlimes, getFriends }}
        >
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;