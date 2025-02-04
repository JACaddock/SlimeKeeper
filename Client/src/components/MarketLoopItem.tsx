import { MarketSlime } from "../types/Slime";

interface Props {
    slime: MarketSlime;
}

const MarketLoopItem = ({ slime }: Props) => {
    return (
        <div className="market-item">
            <h2>{slime.name}</h2>
            <p>Price: ${slime.price}</p>
        </div>
    );
};

export default MarketLoopItem;