import axios from "axios";
import { useState, useEffect } from "react";
import { Slime, UndefinedSlime } from "../types/Slime";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { getRarity } from "../utils/RarityStringUtil.ts";
import OtherSlime from "../components/OtherSlime.tsx";
import OwnSlime from "../components/OwnSlime.tsx";


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
                        console.log("Could not find the owner");
                    })
            })
            .catch((e) => {
                console.log("Something went wrong: " + e);
            })
    }


    return (
        <main>
            {slime ?
            (
                <div>
                    {isLoggedIn() && user?.username == username && user != null
                        ? (<OwnSlime slime={slime} userid={user.id} setSlime={setSlime}  />)
                        : (<OtherSlime slime={slime} userid={user?.id} getSlime={getSlime} username={username} />)
                    }
                    {slime.slimeStats
                        ?
                        (<div className="flex-column margin-top-2em">
                            <p>Health: {slime.slimeStats.health} / {slime.slimeStats.maxHealth}</p>
                            <p>Stamina: {slime.slimeStats.stamina} / {slime.slimeStats.maxStamina}</p>
                            <p>Hunger: {slime.slimeStats.hunger} / {slime.slimeStats.maxHunger}</p>
                            <p>Strength: {slime.slimeStats.strength} | Speed: {slime.slimeStats.speed}</p>
                            <p>{getRarity(slime.slimeStats.rarity)}</p>
                        </div>)
                        :
                        (<>
                        </>)
                    }
                </div>
            ):
            (
                <div>
                    <p>Could not find this slime :(</p>
                </div>
            )
            }
        </main>
    );
}

export default SlimePage;