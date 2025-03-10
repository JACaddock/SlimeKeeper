import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useAccount } from "../hooks/useAccount";


const PlayPage = () => {
    const navigate = useNavigate();
    const { changeGold, getGold, getSlimes } = useAccount();
    const { user } = useAuth();


    function handleEarnGold() {
        if (user != null) {
            axios.post("/api/user/earn/?id=" + user.id)
                .then((response) => {
                    if (response.data) {
                        changeGold(1000);
                    }
                })
        }
    }


    return (
        <main>
            <p>You have {getGold()} gold {getGold() > 1000 ? ("...You should spend some!"): ("...Better save up some more...")}</p>
            <p>You have {getSlimes().length} slimes.</p>
            <div className="flex">
                {getSlimes().map((slime) => {
                    return (
                        <div key={slime.id}>
                            <div onClick={() => { navigate("/slime/" + slime.id) }} key={slime.id} className="market-item image-wrapper">
                                {parse(slime.svg)}
                            </div>
                            <p>{slime.name}</p>
                        </div>
                    )
                })}
            </div>
            <button type="button" onClick={handleEarnGold}>Click to Earn Gold!</button>
        </main>
  );
}

export default PlayPage;