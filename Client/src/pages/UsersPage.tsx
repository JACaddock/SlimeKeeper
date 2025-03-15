import { useEffect, useState } from "react";
import { UserAccount } from "../types/User";
import axios from "axios";
import ListItem from "../components/ListItem";
import useObjectClick from "../hooks/useObjectClick";

const UsersPage = () => {
    const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
    const { handleObjectClicked } = useObjectClick();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("/api/user/account")
        .then((response) => {
            const users = response.data.sort((a: UserAccount, b: UserAccount) => b.gold - a.gold);
            setUserAccounts(users);
            setLoaded(true);
        })
        .catch(() => {
            setUserAccounts([]);
            setLoaded(true);
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
                                key={index} name={userAccount.username} 
                                handleItemClick={() => { handleObjectClicked(userAccount, "/user/", "currentUser") }}
                                body={userAccount.gold + "G | " + userAccount.slimes.length + " Slimes | " + userAccount.friends.length + " Friends"}
                            />
                    )}
                </div>)
                : !loaded ?
                <h3>Loading...</h3>
                :
                <p>Could not find any users</p>
            }
        </main>
    );
}

export default UsersPage;