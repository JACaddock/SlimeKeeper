import axios from "axios";
import { useState, useEffect } from "react";
import { UserAccount } from "../types/User";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserItem from "../components/UserItem";
import { userAccountDefault } from "../constants/UserDefaults";


const UserPage = () => {
    const { id } = useParams();
    const [userAccount, setUserAccount] = useState<UserAccount | null>(userAccountDefault);
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
                setUserAccount(null);
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