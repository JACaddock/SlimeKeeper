import axios from "axios";
import { useState, useEffect } from "react";
import { UserAccount } from "../types/User";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserItem from "../components/UserItem";


const UserPage = () => {
    const { id } = useParams();
    const [userAccount, setUserAccount] = useState<UserAccount>();
    const { user } = useAuth();

    useEffect(() => {
        getUserAccount(id);
    }, [id])

    function getUserAccount(id: string | undefined) {
        axios.get("/api/user/account/" + id)
            .then((response) => {
                setUserAccount(response.data);
            })
            .catch(() => {
                //console.log("Something went wrong: " + e)
            })
    }

    return (
        <main>
            {userAccount && user?.id == userAccount.id ? (
                <UserItem userAccount={userAccount} pronouns={"You have"} />
            ) :
             userAccount ? (
                    <UserItem userAccount={userAccount} pronouns={userAccount.username + " has"} />
            ) :
            (
                <div>
                    <p>Could not find this user :(</p>
                </div>
            )
            }
        </main>
    );
}

export default UserPage;