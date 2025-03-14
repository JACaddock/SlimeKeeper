import { useEffect, useState } from "react";
import { UserAccount } from "../types/User";
import { userAccountDefault } from "../constants/UserDefaults";
import axios from "axios";
import ListItem from "../components/ListItem";
import useObjectClick from "../hooks/useObjectClick";

const UsersPage = () => {
    const [userAccounts, setUserAccounts] = useState<UserAccount[]>(
        Array.from({ length: 30 }, (_, i) => ({ ...userAccountDefault, id: i }))
    );
    const { handleObjectClicked } = useObjectClick();

    useEffect(() => {
        axios.get("/api/user/account")
        .then((response) => {
            const users = response.data.sort((a: UserAccount, b: UserAccount) => b.gold - a.gold);
            setUserAccounts(users);
        })
        .catch(() => {
            setUserAccounts([]);
        })
    }, [])

    return (
        <main>
            <h2>Users</h2>
            {userAccounts.length > 0 ?
                (<div className="list-container">
                    {userAccounts
                        .map((userAccount, index) => 
                            <ListItem
                                key={index} index={index} name={userAccount.username} 
                                handleItemClick={() => { handleObjectClicked(userAccount, "/user/", "currentUser") }}
                                body={userAccount.gold + "G | " + userAccount.slimes.length + " Slimes | " + userAccount.friends.length + " Friends"}
                            />
                    )}
                </div>)
                :
                <p>Could not find any users</p>
            }
        </main>
    );
}

export default UsersPage;