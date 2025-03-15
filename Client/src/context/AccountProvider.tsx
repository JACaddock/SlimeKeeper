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
        if (userAccount && slime.ownerId == userAccount.id) {
            const slimes = userAccount.slimes;
            const index = slimes.findIndex(s => s.id === slimeId);
            slimes[index] = slime;
            setUserAccount({ ...userAccount, slimes: slimes });
        }
    }

    const addSlime = (slime: Slime) => {
        if (userAccount) {
            const slimes = userAccount.slimes;
            slimes.push(slime);
            setUserAccount({ ...userAccount, slimes: slimes });
        }
    }

    const getId = () => userAccount?.id ?? -1;
    const getUsername = () => userAccount?.username ?? "???";
    const getGold = () => userAccount?.gold ?? 0;
    const isAdmin = () => userAccount?.isAdmin ?? false;

    const getSlimes = (forceGet: boolean = false, wantMarket: boolean = false) => {
        if (userAccount?.slimes) {
            if (!lastUpdatedSlimes || forceGet) {
                axios.get("/api/slime/owner/" + userAccount.id)
                .then((response) => {
                    setLastUpdatedSlimes(new Date());
                    setUserAccount({ ...userAccount, slimes: response.data });
                    if (!wantMarket) return response.data.filter((s: Slime) => !s.isOnMarket);
                    return response.data;
                })
                .catch((error) => {
                    console.log("Failure: " + error);
                })
            }
            if (!wantMarket) return userAccount.slimes.filter(s => !s.isOnMarket);
            return userAccount.slimes;
        }
        return [];
    };


    const getFriends = () => userAccount?.friends ?? [];


    function handleSubmitSplice(slimes: Slime[]) {
        const userAccountRequest: UserAccount = {
            id: getId(),
            username: getUsername(),
            isAdmin: isAdmin(),
            gold: getGold(),
            slimes: slimes,
            friends: getFriends()
        }

        axios.post("/api/user/splice", userAccountRequest)
        .then((response) => {
            console.log(response.data);
            setUserAccount(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <AccountContext.Provider
            value={{
                hasEnoughGold, changeGold, isAFriend, handleSubmitSplice, getGold,
                isAdmin, addSlime, updateSlime, getSlimes, getFriends, userAccount
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;