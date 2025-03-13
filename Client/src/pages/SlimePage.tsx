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
    const [slime, setSlime] = useState<Slime | null>(() => {
        const currentSlime = localStorage.getItem("currentSlime");
        if (currentSlime && JSON.parse(currentSlime).id == id) {
            return JSON.parse(currentSlime);
        }
        else return slimeDefault;
    });
    const [username, setUsername] = useState(slime?.ownerName?? "");
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
        .then((response) => {
            setSlime(response.data);
            setUsername(response.data.ownerName)
            localStorage.setItem("currentSlime", JSON.stringify(response.data));
            const ownerId = response.data.ownerId;
            const storedUser = localStorage.getItem("currentUser");
            if (!storedUser || (storedUser && JSON.parse(storedUser).id != ownerId)) {
                axios.get("/api/user/account/" + ownerId)
                .then((response) => {
                    localStorage.setItem("currentUser", JSON.stringify(response.data))
                })
                .catch(() => {})
            }
        })
        .catch(() => {
            setSlime(null);
            localStorage.removeItem("currentSlime");
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