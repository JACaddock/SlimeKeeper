import axios from "axios";
import { useState, useEffect } from "react";
import { Slime, EditableSlime, UndefinedSlime } from "../types/Slime";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { useAccount } from "../hooks/useAccount.tsx";
import {Quill} from "../assets/Quill.tsx";
import {Tick} from "../assets/Tick.tsx";


const SlimePage = () => {
    const { id } = useParams();
    const [slime, setSlime] = useState<Slime>(UndefinedSlime);
    const [slimeName, setSlimeName] = useState(UndefinedSlime.name);
    const [username, setUsername] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameWidth, setNameWidth] = useState(0);
    const { user, isLoggedIn } = useAuth();
    const { hasEnoughGold } = useAccount();
    const [invalidInput, setInvalidInput] = useState(false);

    useEffect(() => {
        getSlime(id);
    }, [id])

    function getSlime(id: string|undefined) {
        axios.get("/api/slime/" + id)
            .then((responseX) => {
                setSlime(responseX.data);
                setSlimeName(responseX.data.name);
                axios.get("/api/user/" + responseX.data.ownerId)
                    .then((responseY) => {
                        setUsername(responseY.data.username);
                    })
                    .catch(() => {
                        console.log("Could not find the owner");
                    })
            })
            .catch((e) => {
                console.log("Something went wrong: " + e);
            })
    }

    function handleUpdateSlime(isOnMarket: boolean | undefined = undefined) {
        if (user?.id == slime.ownerId && !invalidInput) {
            if (isOnMarket != undefined && isOnMarket != slime.isOnMarket || slime.name != slimeName) {
                const editableSlime: EditableSlime = {
                    id: id ? parseInt(id) : slime.id,
                    name: slimeName,
                    isOnMarket: isOnMarket != undefined ? isOnMarket : slime.isOnMarket,
                    ownerId: user ? user.id : slime.ownerId
                }

                console.log(editableSlime);

                axios.post("/api/slime/update/", editableSlime)
                    .then((response) => {
                        if (response.data != null) {
                            setSlime(response.data);
                            setSlimeName(response.data.name);
                        }
                        console.log(response)
                    })
                    .catch((e) => {
                        console.log("Something went wrong: " + e);
                    })
                }
            }
    }

    function handleIsOnMarketChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.checked);
        handleUpdateSlime(event.target.checked);
    }

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target);
        setSlimeName(event.target.value);
        setNameWidth(event.target.value.length + 2);
        if (event.target.value.includes(" ")) {
            setInvalidInput(true);
        }
        else {
            setInvalidInput(false);
        }
    }


    function handlePurchaseSlime() {
        if (user != null && slime != null) {
            axios.post("/api/user/purchase", {
                buyerid: user.id,
                sellerid: slime.ownerId,
                slimeid: slime.id
            })
            .then((response) => {
                if (response.data) {
                    console.log("Purchase Success!");
                    getSlime(id);
                }
                else {
                    console.log("Purchase Failure!");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }


    const addressUser = username == user?.username
        ? <><Link to={"/user/" + slime?.ownerId}>you</Link></>
        : <>user <Link to={"/user/" + slime?.ownerId}>{username}</Link></>


    const editableName = isEditingName
        ?
        <div className="flex salebox-container">
            <input
                maxLength={16}
                className="h2-input" style={{ width: nameWidth + 'ch' }}
                type="text" value={slimeName} onChange={handleNameChange} autoFocus />
            <span style={{ pointerEvents: invalidInput ? "none": "initial" }} className="clickable min-width" onClick={() => {
                setIsEditingName(false);
                handleUpdateSlime();
            }
            }>
                <Tick  />
            </span>
        </div>
        :
        username == user?.username
        ?
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
        :
        <h2>{slime?.name}</h2>



    return (
        <main>
            {slime ? (
                <div className="flex-column">
                    {editableName}
                    <div className="image-wrapper">
                        {parse(slime.svg)}
                    </div>
                    <p>{slime.name} is a {slime.age} year old {slime.colour} coloured slime with a size of {slime.size}</p>
                    <p>{slime.name} is owned by {addressUser} and is worth {slime.price}</p>
                    <div className="flex-column salebox-container">
                        <p>{slime.isOnMarket ? slime.name + " is for sale" : slime.name + " is not for sale"}</p>
                        {slime.ownerId == user?.id ? (
                            <input type="checkbox" id="isOnMarket" name="isOnMarket" checked={slime.isOnMarket} onChange={handleIsOnMarketChange} />
                        ) : isLoggedIn() && slime.isOnMarket ?
                        (
                            <button disabled={!hasEnoughGold(slime.price)} onClick={handlePurchaseSlime}>Buy</button>
                        ) :
                        (
                            <></>
                        )
                        }
                    </div>
                    {slime.slimeStats
                        ?
                        (<div>
                            <p>Health: {slime.slimeStats.health} / {slime.slimeStats.maxHealth}</p>
                            <p>Stamina: {slime.slimeStats.stamina} / {slime.slimeStats.maxStamina}</p>
                            <p>Hunger: {slime.slimeStats.hunger} / {slime.slimeStats.maxHunger}</p>
                            <p>Strength: {slime.slimeStats.strength} | Speed: {slime.slimeStats.speed}</p>
                            <p>Rarity: {slime.slimeStats.rarity}</p>
                        </div>)
                        :
                        (<>
                        </>)
                    }
                    {invalidInput ? <p style={{ color: "red", fontStyle: "italic" }}>One or more of your inputs are invalid!</p> : <></>}
                </div>
            ):
            (
                <div>
                    <p>Could not find this slime :(</p>
                </div>
            )
            }
        </main>
    );
}

export default SlimePage;