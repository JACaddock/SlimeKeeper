import parse from "html-react-parser";
import { useState } from "react";
import { Quill } from "../assets/Quill";
import { Tick } from "../assets/Tick";
import { SlimeEditable, Slime } from "../types/Slime";
import axios from "axios";
import useObjectClick from "../hooks/useObjectClick";

interface Props {
    slime: Slime;
    userid: number | undefined;
    setSlime: (slime: Slime) => void;
}

const OwnSlime = ({ slime, userid, setSlime }: Props) => {
    const [slimeName, setSlimeName] = useState(slime.name);
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameWidth, setNameWidth] = useState(0);
    const [invalidInput, setInvalidInput] = useState(false);
    const { handleObjectClicked } = useObjectClick();


    function handleUpdateSlime(isOnMarket: boolean | undefined = undefined) {
        if (userid == slime.ownerId && !invalidInput) {
            if (isOnMarket != undefined && isOnMarket != slime.isOnMarket || slime.name != slimeName) {
                const slimeEditable: SlimeEditable = {
                    id: slime.id,
                    name: slimeName,
                    isOnMarket: isOnMarket != undefined ? isOnMarket : slime.isOnMarket,
                    ownerId: userid,
                    ownerName: slime.ownerName
                }

                axios.post("/api/slime/update/", slimeEditable)
                    .then((response) => {
                        if (response.data != null) {
                            setSlime(response.data);
                            setSlimeName(response.data.name);
                        }
                    })
                    .catch(() => {})
            }
        }
    }

    function handleIsOnMarketChange(event: React.ChangeEvent<HTMLInputElement>) {
        handleUpdateSlime(event.target.checked);
    }

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSlimeName(event.target.value);
        setNameWidth(event.target.value.length + 2);
        if (event.target.value.includes(" ")) {
            setInvalidInput(true);
        }
        else {
            setInvalidInput(false);
        }
    }

    const editableName = isEditingName
        ?
        <div className="flex salebox-container">
            <input
                maxLength={16}
                className="h2-input" style={{ width: nameWidth + 'ch' }}
                type="text" value={slimeName} onChange={handleNameChange} autoFocus />
            <span style={{ pointerEvents: invalidInput ? "none" : "initial" }} className="clickable min-width" onClick={() => {
                setIsEditingName(false);
                handleUpdateSlime(undefined);
            }
            }>
                <Tick />
            </span>
        </div>
        :
        <div className="flex salebox-container">
            <h2>{slime?.name}</h2>
            <span className="clickable min-width" onClick={() => {
                setIsEditingName(true);
                setNameWidth(slimeName.length + 2);
            }
            }>
                <Quill />
            </span>
        </div>



    return (
        <div className="flex-column">
            {slime.slimeStats?.health ?? 1 > 0 ? editableName : <h2>{slime?.name}</h2>}
            {invalidInput ? <p style={{ color: "red", fontStyle: "italic" }}>One or more of your inputs are invalid!</p> : <></>}
            <div className="image-wrapper">
                {parse(slime.svg?? "")}
            </div>
            <p>{slime.name} is a {slime.slimeStats ? Math.trunc(slime.slimeStats.age) : ""} year old slime with a size of {slime.size}</p>
            <p>{slime.name} is owned by <span className="span-link" onClick={() => {
                handleObjectClicked({
                    id: slime.ownerId,
                    username: slime.ownerName,
                    isAdmin: false, gold: 0,
                    slimes: [slime], friends: []
                }, "/user/", "currentUser")
            }}>you</span> and is worth {slime.price}</p>
            <div className="flex-column salebox-container">
                {slime.slimeStats?.health ?? 1 > 0 ?
                    (<><p>{slime.isOnMarket ? slime.name + " is for sale" : slime.name + " is not for sale"}</p>
                    <input type="checkbox" id="isOnMarket" name="isOnMarket"
                        checked={slime.isOnMarket} onChange={handleIsOnMarketChange} /></>)
                    :
                    (
                        <p>{slime.name} is dead</p>
                    )
                }
            </div>
        </div>
    );
}

export default OwnSlime;