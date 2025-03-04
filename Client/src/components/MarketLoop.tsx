import { useState, useEffect } from "react";
import { MarketSlime } from "../types/Slime";
import MarketLoopItem from "./MarketLoopItem";
import "../css/MarketLoop.css";



const MarketLoop = () => {
    const [slimes, setSlimes] = useState<MarketSlime[]>([]);
    const [index, setIndex] = useState<number>(0);


    useEffect(() => {
        getMarketSlimes();
    }, [index]);

    const marketslimes = slimes.length <= 0
        ? <p>Unable to load Market Loop</p>
        : <>{getVisibleSlimes().map((slime) =>
                <MarketLoopItem key={slime.id} slime={slime} />
          )}
          </>

    return (
        <div className="market-container">
            <button className="market-button" onClick={decreaseIndex}>{'<='}</button>
            {marketslimes}
            <button className="market-button" onClick={increaseIndex}>{'=>'}</button>
        </div>
    );

    async function getMarketSlimes() {
        const response = await fetch('slime/market/');
        if (response.ok) {
            const data = await response.json();
            setSlimes(data);
        }
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
};

export default MarketLoop;