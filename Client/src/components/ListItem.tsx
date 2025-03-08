import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

interface Props {
    id: number;
    path: string;
    name: string;
    body: string;
    svg?: string;
}


const ListItem = ({ id, path, name, body, svg }: Props) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate(path + id) }} className="market-item">
            {svg ? parse(svg) : ""}
            <h2>{name}</h2>
            <p>{body}</p>
        </div>
    );
}

export default ListItem;