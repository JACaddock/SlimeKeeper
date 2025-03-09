import axios from "axios";
import { Slime } from "../types/Slime";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useAccount } from "../hooks/useAccount.tsx";

interface Props {
    slime: Slime;
    username: string;
    getSlime: (id: string | undefined) => void;
    userid: number | undefined;
}


const OtherSlime = ({ slime, username, getSlime, userid }: Props) => {
    const { hasEnoughGold } = useAccount();

    function handlePurchaseSlime() {
        if (userid != null && slime != null) {
            axios.post("/api/user/purchase", {
                buyerid: userid,
                sellerid: slime.ownerId,
                slimeid: slime.id
            })
                .then((response) => {
                    console.log(response.status + ": Purchase Success!");
                    getSlime(String(slime.id));
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <main>
            {slime ? (
                <div className="flex-column">
                    <h2>{slime.name}</h2>
                    <div className="image-wrapper">
                        {parse(slime.svg)}
                    </div>
                    <p>{slime.name} is a {slime.age} year old {slime.colour} coloured slime with a size of {slime.size}</p>
                    <p>{slime.name} is owned by user <Link to={"/user/" + slime?.ownerId}>{username}</Link> and is worth {slime.price}</p>
                    <div className="flex-column salebox-container">
                        <p>{slime.isOnMarket ? slime.name + " is for sale" : slime.name + " is not for sale"}</p>
                        {userid && slime.isOnMarket ?
                            (
                                <button disabled={!hasEnoughGold(slime.price)} onClick={handlePurchaseSlime}>Buy</button>
                            ) :
                            (
                                <></>
                            )
                        }
                    </div>
                </div>
            ) :
                (
                    <div>
                        <p>Could not find this slime :(</p>
                    </div>
                )
            }
        </main>
    );
}

export default OtherSlime;