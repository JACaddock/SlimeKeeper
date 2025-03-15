import { useState, useEffect } from "react";
import axios from "axios";
import { MarketSlime } from "../types/Slime";
import ListItem from "./ListItem";
import { Arrow } from "../assets/Arrow.tsx";
import "../css/MarketLoop.css";
import useDetectDevice from "../hooks/useDetectDevice";
import useObjectClick from "../hooks/useObjectClick.tsx";



const MarketLoop = () => {
    const [slimes, setSlimes] = useState<MarketSlime[]>([]);
    const { handleObjectClicked } = useObjectClick();
    const [index, setIndex] = useState<number>(0);
    const { isMiniture, isMobile, isTablet } = useDetectDevice();
    const [loaded, setLoaded] = useState(false);
    const [visibleSlimeCount, setVisibleSlimeCount] = useState(6);

    useEffect(() => {
        axios.get('/api/slime/market/')
            .then((response) => {
                const updatedSlimes = response.data;
                setSlimes(updatedSlimes);
                setLoaded(true);
            })
            .catch(() => {
                setSlimes([]);
                setLoaded(true);
            });
    }, [index]);


    const marketslimes = slimes.length <= 0
        ? <p>Unable to load Market Loop</p>
        : <>{getVisibleSlimes(isMiniture ? 1 : isMobile ? 2 : isTablet ? 4 : 6)
            .map((slime, index) =>
            <ListItem
                key={index} name={slime.name}
                handleItemClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                body={slime.price + "G"}
                svg={slime.svg}
            />
          )}
          </>

    function getVisibleSlimes(max: number = 6) {
        if (visibleSlimeCount != max) setVisibleSlimeCount(max);

        if (index + max <= slimes.length) {
            return slimes.slice(index, index + max)
        }
        else if (slimes.length > max) {
            const visibleSlimes: MarketSlime[] = slimes.slice(index);
            const remainingItems: number = max - visibleSlimes.length;

            return visibleSlimes.concat(slimes.slice(0, remainingItems));
        }
        else {
            return slimes;
        }
    }

    function increaseIndex() {
        if (index + 1 >= slimes.length) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }

    function decreaseIndex() {
        if (index - 1 < 0) {
            setIndex(slimes.length - 1);
        }
        else {
            setIndex(index - 1);
        }
    }

    return (
        <>
            {!loaded ?
                <h3>Loading...</h3>
                :
                slimes.length <= 0 ? (
                    <p>Currently there are no available slimes for purchase :(</p>              
                ) :
                    (
                    <div className={"market-container " + (slimes.length < visibleSlimeCount + 2 ? "market-flex" : "")}>
                        <button hidden={slimes.length < visibleSlimeCount + 2} className="market-button market-button-left" title="Left Arrow" onClick={decreaseIndex}>
                            <Arrow className="arrow left-arrow" />
                        </button>
                        { marketslimes }
                        <button hidden={slimes.length < visibleSlimeCount + 2} className="market-button" title="Right Arrow" onClick={increaseIndex}>
                            <Arrow className="arrow" />
                        </button>
                    </div>
                )  
            }
        </>
    );
};

export default MarketLoop;