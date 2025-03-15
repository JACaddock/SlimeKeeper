import axios from "axios";
import { Slime } from "../types/Slime";
import parse from "html-react-parser";
import { useAccount } from "../hooks/useAccount.tsx";
import useObjectClick from "../hooks/useObjectClick.tsx";

interface Props {
    slime: Slime;
    username: string;
    getSlime: (id: string | undefined) => void;
    userid: number | undefined;
}


const OtherSlime = ({ slime, username, getSlime, userid }: Props) => {
    const { hasEnoughGold, changeGold, addSlime } = useAccount();
    const { handleObjectClicked } = useObjectClick();

    function handlePurchaseSlime() {
        if (userid != null && slime != null) {
            axios.post("/api/user/purchase", {
                buyerid: userid,
                sellerid: slime.ownerId,
                slimeid: slime.id
            })
            .then(() => {
                //console.log(response.status + ": Purchase Success!");
                getSlime(String(slime.id));
                addSlime({ ...slime, ownerId: userid, isOnMarket: false });
                changeGold(-slime.price);
            })
            .catch(() => {
                //console.log(error);
            })
        }
    }

    return (
        <div className="flex-column">
            <h2>{slime.name}</h2>
            <div className="image-wrapper">
                {parse(slime.svg ?? "")}
            </div>
            <p>{slime.name} is a {slime.slimeStats ? Math.trunc(slime.slimeStats.age) : ""} year old slime with a size of {slime.size}</p>
            <p>{slime.name} is owned by user <span className="span-link" onClick={() => {
                handleObjectClicked({
                    id: slime.ownerId,
                    username: slime.ownerName,
                    isAdmin: false, gold: 0,
                    slimes: [slime], friends: []
                }, "/user/", "currentUser")
            }}>{username}</span> and is worth {slime.price}</p>
            <div className="flex-column salebox-container">
                {slime.slimeStats?.health ?? 1 > 0 ?
                    (<><p>{slime.isOnMarket ? slime.name + " is for sale" : slime.name + " is not for sale"}</p>
                        {userid != undefined && slime.isOnMarket ?
                            (
                                <button type="button" disabled={!hasEnoughGold(slime.price)} onClick={handlePurchaseSlime}>Buy</button>
                            ) :
                            (
                                <></>
                            )
                        }</>)
                    :
                    (
                        <p>{slime.name} is dead</p>
                    )}
            </div>
        </div>
    );
}

export default OtherSlime;