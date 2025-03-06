import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserAccount } from "../types/User";
import axios from "axios";

const PlayPage = () => {
    const [userAccount, setUserAccount] = useState<UserAccount>();
    const { user } = useAuth();

    useEffect(() => {
        axios.get("/api/user/account/" + user?.id)
            .then((response) => {
                setUserAccount(response.data);
            })
            .catch((e) => {
                console.log("Could not find account details: " + e);
            })
    }, [user]);


    return (
        <main>
            {userAccount? (
                <div>
                    <p>Hello {userAccount.username}!</p>
                    <p>You have {userAccount.gold} gold {userAccount.gold > 1000 ? ("...You should spend some!"): ("...Better save up some more...")}</p>
                    <p>You have {userAccount.slimes.length} slimes.</p>
                    <p>You have {userAccount.friends.length} friends.</p>
                </div>
            ):
            (
                <div>
                    <p>Sorry {user?.username}, I could not find your account details :(</p>
                </div>
            )}
        </main>
  );
}

export default PlayPage;