import axios, { AxiosResponse } from "axios";
import { SlimeFeeder, SlimeTrainer } from "../types/SlimeStats";

interface Props {
    text: string;
    isDisabled: boolean;
    path: string
    request: SlimeFeeder | SlimeTrainer
    sendResponse: (response: AxiosResponse) => void;
    className?: string
}

const RequestButton = ({ text, isDisabled, path, request, sendResponse, className }: Props) => {

    function handleRequestClick() {
        axios.post(path, request)
        .then((response) => {
            //console.log(response.status);
            //console.log(response.data);
            sendResponse(response);
        })
        .catch(() => {
            //console.log(error);
        })
    }

    return (
        <button type="button" className={className} disabled={isDisabled} onClick={handleRequestClick}>{text}</button>
    )
}

export default RequestButton;