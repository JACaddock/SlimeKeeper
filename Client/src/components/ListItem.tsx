import parse from "html-react-parser";
import { useEffect, useState } from "react";

interface Props {
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


const ListItem = ({ name, body, svg, handleItemClick }: Props) => {
    const [item, setItem] = useState<Item>({name, body, svg})

    useEffect(() => {
        setItem({ name, body, svg });
    }, [name, body, svg]);


    return (
        <div
            onClick={() => { handleItemClick() }}
            className={`market-item`}
        >
            {item.svg ? parse(item.svg) : ""}
            <h2>{item.name}</h2>
            <p>{item.body}</p>
        </div>
    );
}

export default ListItem;