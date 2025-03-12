import { useState, useEffect } from "react";
import { MarketSlime } from "../types/Slime";
import axios from "axios";
import ListItem from "../components/ListItem";
import { marketSlimeDefault } from "../constants/SlimeDefault";

function MarketPage() {
    const [slimes, setSlimes] = useState<MarketSlime[]>(
        Array.from({ length: 10 }, (_, i) => ({ ...marketSlimeDefault, id: i }))
    );

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
                            path="/slime/" name={slime.name}
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