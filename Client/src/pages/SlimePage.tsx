import axios from "axios";
import { useState, useEffect } from "react";
import { Slime } from "../types/Slime";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";

const SlimePage = () => {
    const { id } = useParams();
    const [slime, setSlime] = useState<Slime>();
    const [username, setUsername] = useState("");

    useEffect(() => {
        getSlime(id);
    }, [id])

    function getSlime(id: string|undefined) {
        axios.get("/api/slime/" + id)
        .then((response) => {
            setSlime(response.data);
            axios.get("/api/user/" + response.data.ownerId)
            .then((res2) => {
                setUsername(res2.data.username)
            })
            .catch(() => {
                console.log("Could not find the owner")
            })
        })
        .catch((e) => {
            console.log("Something went wrong: " + e)
        })
    }

    return (
        <main>
            {slime ? (
                <div>
                    <h2>{slime.name}</h2>
                    <div className="image-wrapper">
                        {parse(slime.svg)}
                    </div>
                    <p>{slime.name} is a {slime.age} year old {slime.colour} coloured slime with a size of {slime.size}</p>
                    <p>{slime.name} is owned by user <Link to={"/user/" + slime.ownerId}>{username}</Link> and is worth {slime.price}</p>
                    <p>{slime.isOnMarket ? slime.name + " is for sale" : slime.name + " is not for sale"}</p>
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