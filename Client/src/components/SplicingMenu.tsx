import { useState } from "react";
import { Slime } from "../types/Slime";
import parse from "html-react-parser";
import { useAccount } from "../hooks/useAccount";

interface Props {
    setIsSplicing: (bool: boolean) => void;
    slimes: Slime[];
    removeSlime: (slime: Slime) => void;
}

const SplicingMenu = ({ setIsSplicing, slimes, removeSlime }: Props) => {
    const [open, setOpen] = useState(false);
    const { handleSubmitSplice } = useAccount();


    function updateSplicingState(bool: boolean) {
        setOpen(bool);
        setIsSplicing(bool);
    }

    return (
        <div>
            {open
            ?
                <div className="splice-menu">
                    <button onClick={() => updateSplicingState(false)}>Close</button>
                    <div className="flex">
                    {slimes.map((slime) => {
                        return (
                            <div key={slime.id} onClick={() => {removeSlime(slime)}}>
                                <div key={slime.id} className="market-item image-wrapper">
                                    {parse(slime.svg)}
                                </div>
                                <p>{slime.name}</p>
                            </div>
                        )
                    })} 
                    </div>
                    <div hidden={slimes.length < 2}>
                        <button onClick={() => {
                            updateSplicingState(false)
                            handleSubmitSplice(slimes)
                        }}>Splice</button>
                    </div>
                </div>
            :
            <button onClick={() => updateSplicingState(true)}>Splice Slimes</button>
            }
        </div>
    );
}

export default SplicingMenu;