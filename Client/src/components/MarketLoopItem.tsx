import { useNavigate } from "react-router-dom";
import { MarketSlime } from "../types/Slime";
import parse from "html-react-parser";

interface Props {
    slime: MarketSlime;
}

const MarketLoopItem = ({ slime }: Props) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate("/slime/" + slime.id) }} className="market-item">
            {parse(slime.svg)}
            <h2>{slime.name}</h2>
            <p>Price: ${slime.price}</p>
        </div>
    );
};

export default MarketLoopItem;