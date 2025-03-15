import { useState } from "react";
import { Slime } from "../types/Slime";
import parse from "html-react-parser";
import { useAccount } from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";

interface Props {
    setIsSplicing: (bool: boolean) => void;
    slimes: Slime[];
    removeSlime: (slime: Slime) => void;
}

enum States {
    CLOSED,
    OPEN,
    PENDING
}



const SplicingMenu = ({ setIsSplicing, slimes, removeSlime }: Props) => {
    const [state, setState] = useState<States>(States.CLOSED);
    const { handleSubmitSplice } = useAccount();
    const [newSlime, setNewSlime] = useState<Slime>();
    const navigate = useNavigate();


    function updateSplicingState(state: States) {
        setState(state);
        const bool = state == States.CLOSED ? false : true; 
        setIsSplicing(bool);
    }

    async function handleSubmit() {
        updateSplicingState(States.PENDING)
        setNewSlime(await handleSubmitSplice(slimes));
    }


    return (
        <div>
            {state == States.OPEN
            ?
                <div className="splice-menu">
                    <button onClick={() => updateSplicingState(States.CLOSED)}>Close</button>
                    <div className="flex">
                    {slimes.map((slime) => {
                        return (
                            <div key={slime.id}>
                                <div key={slime.id} className="market-item image-wrapper" onClick={() => { removeSlime(slime) }}>
                                    {parse(slime.svg)}
                                </div>
                                <p>{slime.name}</p>
                            </div>
                        )
                    })} 
                    </div>
                    <div hidden={slimes.length < 2}>
                        <button onClick={handleSubmit}>Splice</button>
                    </div>
                </div>
            : state == States.PENDING 
            ?
            <div>
                {newSlime != undefined ?
                <div>
                    <p>You've made a new Slime!</p>
                    <div className="flex market-item image-wrapper" onClick={() => {navigate("/slime/" + newSlime.id)}}>
                        {parse(newSlime.svg)}
                    </div>
                    <p>{newSlime.name}</p>
                    <button onClick={() => updateSplicingState(States.CLOSED)}>Okay</button>
                </div>
                :
                <p>Totally Pending rn</p>
                }
            </div>
            :
            <button onClick={() => updateSplicingState(States.OPEN)}>Splice Slimes</button>
            }
        </div>
    );
}

export default SplicingMenu;