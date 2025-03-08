import { useEffect, useState } from "react";
import { UserAccount } from "../types/User";
import axios from "axios";
import ListItem from "../components/ListItem";

const UsersPage = () => {
    const [userAccounts, setUserAccounts] = useState<UserAccount[]>();

    useEffect(() => {
        axios.get("/api/user/account")
        .then((response) => {
            setUserAccounts(response.data)
        })
    }, [])

    return (
        <main>
            <h2>Users</h2>
            {userAccounts ?
                (<div className="flex">
                    {userAccounts.map((userAccount) => 
                            <ListItem
                                key={userAccount.id} id={userAccount.id}
                            path="/user/" name={userAccount.username}
                            body={userAccount.gold + "G | " + userAccount.slimes.length + " Slimes | " + userAccount.friends + " Friends"}
                            />
                    )}
                </div>)
                :
                (<p>Could not find any users</p>)
            }
        </main>
    );
}

export default UsersPage;