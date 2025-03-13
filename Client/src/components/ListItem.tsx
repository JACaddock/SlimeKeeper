import parse from "html-react-parser";
import { useEffect, useState } from "react";

interface Props {
    index: number;
    name: string;
    body: string;
    svg?: string;
    handleItemClick: () => void;
}

type Item = {
    name: string;
    body: string;
    svg?: string;
}


const ListItem = ({ index, name, body, svg, handleItemClick }: Props) => {
    const [item, setItem] = useState<Item>({name, body, svg})
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const startDelay = index * 300; 
        const animationDuration = 1000; 

        const startTimeout = setTimeout(() => {
            setFading(true); 
        }, startDelay);

        const stopTimeout = setTimeout(() => {
            setItem({ name, body, svg });
            setFading(false); 
        }, startDelay + animationDuration);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(stopTimeout);
        };
    }, [name, body, svg, index]);


    return (
        <div
            onClick={() => { handleItemClick() }}
            className={`market-item ${fading ? "fading" : ""}`}
        >
            {item.svg ? parse(item.svg) : ""}
            <h2>{item.name}</h2>
            <p>{item.body}</p>
        </div>
    );
}

export default ListItem;