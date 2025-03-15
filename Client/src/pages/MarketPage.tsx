import { useState, useEffect } from "react";
import { Slime } from "../types/Slime";
import axios from "axios";
import ListItem from "../components/ListItem";
import useObjectClick from "../hooks/useObjectClick";

function MarketPage() {
    const [slimes, setSlimes] = useState<Slime[]>([]);
    const { handleObjectClicked } = useObjectClick();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("/api/slime/market")
            .then((response) => {
                const loadedSlimes = response.data;
                setSlimes(loadedSlimes);
                setLoaded(true);
            })
            .catch(() => {
                setSlimes([]);
                setLoaded(true);
            })
    }, [])

    return (
        <main>
            <h2>Market</h2>
            {slimes.length > 0 ?
                (<div className="list-container">
                    {slimes
                        .map((slime, index) =>
                        <ListItem
                            key={index} name={slime.name}
                            handleItemClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                            body={slime.price + "G"}
                            svg={slime.svg}
                        />
                    )}
                </div>)
                :
                !loaded ?
                <h3>Loading...</h3>
                :
                <p>Currently there are no available slimes for purchase :(</p>
            }
        </main>
    );
}

export default MarketPage;