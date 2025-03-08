import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserAccount } from "../types/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";


const PlayPage = () => {
    const navigate = useNavigate();
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


    function handleEarnGold() {
        if (user != null) {
            axios.post("/api/user/earn/", { id: user.id })
                .then((response) => {
                    if (response.data) {
                        if (userAccount) {
                            setUserAccount({ ...userAccount, gold: userAccount.gold + 1000 });
                        }
                    }
                })
        }
    }


    return (
        <main>
            {userAccount? (
                <div>
                    <p>You have {userAccount.gold} gold {userAccount.gold > 1000 ? ("...You should spend some!"): ("...Better save up some more...")}</p>
                    <p>You have {userAccount.slimes.length} slimes.</p>
                    <div className="flex">
                        {userAccount.slimes.map((slime) => {
                            return (
                                <div key={slime.id}>
                                    <div onClick={() => { navigate("/slime/" + slime.id) }} key={slime.id} className="market-item image-wrapper">
                                        {parse(slime.svg)}
                                    </div>
                                    <p>{slime.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={handleEarnGold}>Click to Earn Gold!</button>
                </div>
            ):
            (
                <div>
                    <p>Sorry {user?.username}, We could not find your account details :(</p>
                </div>
            )}
        </main>
  );
}

export default PlayPage;