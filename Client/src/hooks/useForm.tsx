import { useState } from 'react';
import { UserCredentials } from '../types/User';

const useForm = () => {
    const [inputs, setInputs] = useState<UserCredentials>({
        id: null,
        username: "",
        email: "",
        password: "",
    });

    function handleInputUpdate(type: string, value: string) {
        console.log(type, ": ", value);
        const tempInputs = inputs;

        switch (type) {
            case "username":
                tempInputs.username = value;
                break;

            case "email":
                tempInputs.email = value;
                break;

            case "password":
                tempInputs.password = value;
                break;

            default:
                break;
        }

        setInputs(tempInputs);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>, handleForm: (form: UserCredentials) => void) {
        e.preventDefault();
        const userObj: UserCredentials = {
            id: null,
            email: inputs.email,
            username: inputs.username,
            password: inputs.password
        }
        handleForm(userObj);
    };

    return { inputs, setInputs, handleInputUpdate, handleSubmit }
};

export default useForm;