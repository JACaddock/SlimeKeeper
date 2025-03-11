import { useEffect, useState } from "react";
import { AccountContext } from "../hooks/useAccount";
import { UserAccount } from '../types/User';
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Slime } from "../types/Slime";

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [userAccount, setUserAccount] = useState<UserAccount>();
    const [lastUpdatedSlimes, setLastUpdatedSlimes] = useState<Date>();

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

    const updateSlime = (slimeId: number, slime: Slime) => {
        if (userAccount) {
            const slimes = userAccount.slimes;
            const index = slimes.findIndex(s => s.id === slimeId);
            slimes[index] = slime;
            setUserAccount({ ...userAccount, slimes: slimes });
        }
    }

    const getGold = () => userAccount?.gold ?? 0;
    const isAdmin = () => userAccount?.is_admin ?? false;

    const getSlimes = () => {
        if (userAccount?.slimes) {
            if (!lastUpdatedSlimes) {
                axios.get("/api/slime/owner/" + userAccount.id)
                .then((response) => {
                    setLastUpdatedSlimes(new Date());
                    setUserAccount({ ...userAccount, slimes: response.data });
                    return response.data;
                })
                .catch((error) => {
                    console.log("Failure: " + error);
                })
            }
            return userAccount.slimes;
        }
        return [];
    };


    const getFriends = () => userAccount?.friends ?? [];


    return (
        <AccountContext.Provider
            value={{
                hasEnoughGold, changeGold, isAFriend, getGold, isAdmin,
                updateSlime, getSlimes, getFriends
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;