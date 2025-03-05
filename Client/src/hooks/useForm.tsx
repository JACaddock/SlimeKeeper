import { useEffect, useState } from 'react';
import InputItem from '../components/InputItem';
import axios from 'axios';
import { UserUnique } from '../types/User';

const useForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, []);

    function getAllUsers() {
        axios.get("/user/")
            .then((response) => {
                setUsers(response.data)
            })
    };

    const userdisplay = users.length <= 0
        ? <p>Unable to load Users</p>
        : <>{users.map((user: UserUnique) =>
            <div key={user.username} className="flex">
                <p>{user.username}</p>
                <p>{user.email}</p>
            </div>
        )}
        </> 


    function createLoginForm() {
        return (
            <form onSubmit={(e) => submitForm(e, "/user/login/")} >
                <InputItem type="text" name="username" input={username}
                    autoComplete="username" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <InputItem type="password" name="password" input={password}
                    autoComplete="current-password" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        )
    };

    function createRegisterForm() {
        return (
            <>
                <form onSubmit={(e) => submitForm(e, "/user/register/")} >
                    <InputItem type="email" name="email" input={email}
                        autoComplete="email" required={true}
                        handleInputUpdate={handleInputUpdate} />

                    <InputItem type="text" name="username" input={username}
                        autoComplete="username" required={true}
                        handleInputUpdate={handleInputUpdate} />

                    <InputItem type="password" name="password" input={password}
                        autoComplete="new-password" required={true}
                        handleInputUpdate={handleInputUpdate} />

                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div>
                    {userdisplay}
                </div>
            </>
        );
    };


    function handleInputUpdate(type: string, value: string) {
        console.log(type, ": ", value);

        switch (type) {
            case "username":
                setUsername(value);
                break;

            case "email":
                setEmail(value);
                break;

            case "password":
                setPassword(value);
                break;

            default:
                break;
        }
    };

    function submitForm(e: React.FormEvent<HTMLFormElement>, path: string) {
        e.preventDefault();
        axios.post(path, {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            getAllUsers();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return [{ createLoginForm, createRegisterForm }]
};

export default useForm;