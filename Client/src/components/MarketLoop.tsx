import { useState, useEffect } from "react";
import axios from "axios";
import { MarketSlime } from "../types/Slime";
import ListItem from "./ListItem";
import { Arrow } from "../assets/Arrow.tsx";
import "../css/MarketLoop.css";
import useDetectDevice from "../hooks/useDetectDevice";



const MarketLoop = () => {
    const [slimes, setSlimes] = useState<MarketSlime[]>([]);
    const [index, setIndex] = useState<number>(0);
    const { isMiniture, isMobile, isTablet } = useDetectDevice();


    useEffect(() => {
        getMarketSlimes();
    }, [index]);

    const marketslimes = slimes.length <= 0
        ? <p>Unable to load Market Loop</p>
        : <>{getVisibleSlimes(isMiniture ? 1: isMobile ? 2: isTablet ? 4: 6).map((slime) =>
            <ListItem
                key={slime.id} id={slime.id}
                path="/slime/" name={slime.name}
                body={slime.price + "G"}
                svg={slime.svg}
            />
          )}
          </>

    function getMarketSlimes() {
        axios.get('/api/slime/market/')
        .then((response) => {
            setSlimes(response.data);
        })
        .catch(() => {
            //console.log(error);
        })
    }

    function getVisibleSlimes(max: number = 6) {
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
            {
                slimes.length <= 0 ? (
                    <p>Currently there are no available slimes for purchase :(</p>              
                ) :
                    (
                    <div className="market-container">
                        <button className="market-button market-button-left" title="Left Arrow" onClick={decreaseIndex}>
                            <Arrow className="arrow left-arrow" />
                        </button>
                        { marketslimes }
                        <button className="market-button" title="Right Arrow" onClick={increaseIndex}>
                            <Arrow className="arrow" />
                        </button>
                    </div>
                )  
            }
        </>
    );
};

export default MarketLoop;