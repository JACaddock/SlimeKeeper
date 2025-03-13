import parse from "html-react-parser";

interface Props {
    id: number;
    name: string;
    body: string;
    svg?: string;
    handleItemClick: () => void;
}


const ListItem = ({ name, body, svg, handleItemClick }: Props) => {
    return (
        <div onClick={() => { handleItemClick() }} className="market-item">
            {svg ? parse(svg) : ""}
            <h2>{name}</h2>
            <p>{body}</p>
        </div>
    );
}

export default ListItem;