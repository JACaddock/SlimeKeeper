import { MarketSlime } from "../types/Slime";
import Slime from "../assets/Slime.svg";
import SlimeDrop from "../assets/SlimeDrop.svg";

interface Props {
    slime: MarketSlime;
}

const MarketLoopItem = ({ slime }: Props) => {
    let chosenSlime = <img src={Slime} alt="SVG of Slime" className="scale-up" />;
    if (slime.name.startsWith('G')) {
        chosenSlime = <img src={SlimeDrop} alt="SVG of SlimeDrop" className="scale-up" />;
    }

    return (
        <div className="market-item">
            { chosenSlime }
            <h2>{slime.name}</h2>
            <p>Price: ${slime.price}</p>
        </div>
    );
};

export default MarketLoopItem;