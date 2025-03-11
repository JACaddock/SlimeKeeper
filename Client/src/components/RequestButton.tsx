import axios, { AxiosResponse } from "axios";
import { SlimeFeeder, SlimeTrainer } from "../types/SlimeStats";

interface Props {
    text?: string;
    tooltip: string;
    isDisabled: boolean;
    path: string
    request: SlimeFeeder | SlimeTrainer
    sendResponse: (request: SlimeFeeder | SlimeTrainer, response: AxiosResponse) => void;
    className?: string
}

const RequestButton = ({ text="+", tooltip, isDisabled, path, request, sendResponse, className }: Props) => {

    function handleRequestClick() {
        axios.post(path, request)
        .then((response) => {
            sendResponse(request, response);
        })
        .catch(() => {})
    }


    return (
        <div className="tooltip-container">
            <button type="button" className={className} disabled={isDisabled} onClick={handleRequestClick}>{text}</button>
            <span className="tooltip-text" hidden={isDisabled}>{tooltip.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
            ))}</span>
        </div>
    )
}

export default RequestButton;