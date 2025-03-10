import axios from "axios";
import { useState, useEffect } from "react";
import { Slime, UndefinedSlime } from "../types/Slime";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import OtherSlime from "../components/OtherSlime.tsx";
import OwnSlime from "../components/OwnSlime.tsx";
import SlimeStatsBlock from "../components/SlimeStatsBlock.tsx";


const SlimePage = () => {
    const { id } = useParams();
    const [slime, setSlime] = useState<Slime>(UndefinedSlime);
    const [username, setUsername] = useState("");
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        getSlime(id);
    }, [id])

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
                //console.log("Something went wrong: " + e);
            })
    }


    return (
        <main>
            {isLoggedIn() && user?.username == username && user != null
                ? (<OwnSlime slime={slime} userid={user.id} setSlime={setSlime}  />)
                : (<OtherSlime slime={slime} userid={user?.id} getSlime={getSlime} username={username} />)
            }
                {slime.slimeStats
                ? (<SlimeStatsBlock 
                    slimeStats={slime.slimeStats}
                    ownerid={slime.ownerId} userid={user?.id} slimeid={slime.id}
                    setSlimeStats={(slimeStats) => {
                        setSlime({
                            ...slime, slimeStats: slimeStats,
                            price: ((((100 + (slimeStats.maxHealth + slimeStats.maxHunger)) * slimeStats.strength)
                                * slimeStats.speed) * slimeStats.maxStamina) * (slimeStats.rarity + 1)
                        })
                    }}
                    />)
                : (<></>)
            }
        </main>
    );
}

export default SlimePage;