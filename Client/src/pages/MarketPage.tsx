import { useState, useEffect } from "react";
import { Slime } from "../types/Slime";
import axios from "axios";
import ListItem from "../components/ListItem";
import { slimeDefault } from "../constants/SlimeDefault";
import useObjectClick from "../hooks/useObjectClick";

function MarketPage() {
    const [slimes, setSlimes] = useState<Slime[]>(
        Array.from({ length: 5 }, (_, i) => ({ ...slimeDefault, id: i }))
    );
    const { handleObjectClicked } = useObjectClick();

    useEffect(() => {
        axios.get("/api/slime/market")
            .then((response) => {
                setSlimes(response.data);
            })
            .catch(() => {
                setSlimes([]);
            })
    }, [])

    return (
        <main>
            <h2>Users</h2>
            {slimes ?
                (<div className="list-container">
                    {slimes.map((slime) =>
                        <ListItem
                            key={slime.id} id={slime.id}
                            name={slime.name} handleItemClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                            body={slime.price + "G"}
                            svg={slime.svg}
                        />
                    )}
                </div>)
                :
                (<p>Could not find any users</p>)
            }
        </main>
    );
}

export default MarketPage;