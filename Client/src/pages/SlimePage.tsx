import axios from "axios";
import { useState, useEffect } from "react";
import { Slime } from "../types/Slime";
import { slimeDefault } from "../constants/SlimeDefault.ts";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import OtherSlime from "../components/OtherSlime.tsx";
import OwnSlime from "../components/OwnSlime.tsx";
import SlimeStatsBlock from "../components/SlimeStatsBlock.tsx";
import { useAccount } from "../hooks/useAccount.tsx";


const SlimePage = () => {
    const { id } = useParams();
    const [slime, setSlime] = useState<Slime | null>(slimeDefault);
    const [username, setUsername] = useState("");
    const { user, isLoggedIn } = useAuth();
    const { updateSlime } = useAccount();


    useEffect(() => {
        getSlime(id);
    }, [id])


    function updateAndSetSline(newSlime: Slime) {
        updateSlime(newSlime.id, newSlime);
        setSlime(newSlime);
    }

    function getSlime(id: string | undefined) {
        axios.get("/api/slime/" + id)
            .then((responseX) => {
                setSlime(responseX.data);
                axios.get("/api/user/" + responseX.data.ownerId)
                    .then((responseY) => {
                        setUsername(responseY.data.username);
                    })
                    .catch(() => {
                        //console.log("Could not find the owner");
                    })
            })
            .catch(() => {
                setSlime(null);
            })
    }


    return (
        <main>
            {slime ? (<>
                {isLoggedIn() && user?.username == username && user != null
                    ? (<OwnSlime slime={slime} userid={user.id} setSlime={updateAndSetSline} />)
                    : (<OtherSlime slime={slime} userid={user?.id} getSlime={getSlime} username={username} />)
                }
                    {slime.slimeStats
                    ? (<SlimeStatsBlock
                        slimeStats={slime.slimeStats} isOnMarket={slime.isOnMarket}
                        ownerid={slime.ownerId} userid={user?.id} slimeid={slime.id}
                        setSlimeStats={(slimeStats) => {
                            setSlime({
                                ...slime, slimeStats: slimeStats,
                                price: ((((100 + (slimeStats.maxHealth + slimeStats.maxHunger)) * slimeStats.strength)
                                    * slimeStats.speed) * slimeStats.maxStamina) * (slimeStats.rarity + 1)
                            })
                        }}
                        />)
                    : (<></>)}
                </>):
                <p>Could not find this slime...</p>
            }
        </main>
    );
}

export default SlimePage;