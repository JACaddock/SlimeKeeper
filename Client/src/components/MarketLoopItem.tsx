import { MarketSlime } from "../types/Slime";
import parse from "html-react-parser";

interface Props {
    slime: MarketSlime;
}

const MarketLoopItem = ({ slime }: Props) => {
    return (
        <div className="market-item">
             {parse(slime.svg)}
            <h2>{slime.name}</h2>
            <p>Price: ${slime.price}</p>
        </div>
    );
};

export default MarketLoopItem;