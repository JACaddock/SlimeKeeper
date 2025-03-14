import { useNavigate } from "react-router-dom";
import { MarketSlime, Slime } from "../types/Slime";
import { UserAccount } from "../types/User";


const useObjectClick = () => {
    const navigate = useNavigate();

    function handleObjectClicked(object: Slime | UserAccount | MarketSlime, path: string, storage: string) {
        const formerStorage = localStorage.getItem(storage);
        if (!formerStorage || (formerStorage && JSON.parse(formerStorage).id != object.id)) {
            localStorage.setItem(storage, JSON.stringify(object));
        } 
        navigate(path + object.id);
    }


    return { handleObjectClicked }
}

export default useObjectClick;