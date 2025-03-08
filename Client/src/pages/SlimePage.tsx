import axios from "axios";
import { useState, useEffect } from "react";
import { Slime, EditableSlime, UndefinedSlime } from "../types/Slime";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
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
        if (user?.id == slime.ownerId) {
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
        setNameWidth(event.target.value.length + 0.2);
    }


    function handlePurchaseSlime() {
        
    }


    const addressUser = username == user?.username
        ? <><Link to={"/user/" + slime?.ownerId}>you</Link></>
        : <>user <Link to={"/user/" + slime?.ownerId}>{username}</Link></>


    const editableName = isEditingName
        ?
        <div className="flex salebox-container">
            <input className="h2-input" style={{ width: nameWidth + 'ch' }} type="text" value={slimeName} onChange={handleNameChange} autoFocus />
            <span className="clickable min-width" onClick={() => {
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
                <span className="clickable min-width" onClick={() => setIsEditingName(true)}>
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
                        ) : isLoggedIn() ?
                        (
                            <button onClick={handlePurchaseSlime}>Buy</button>
                        ) :
                        (
                            <></>
                        )
                        }
                    </div>
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