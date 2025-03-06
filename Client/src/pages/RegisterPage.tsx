import axios from 'axios';
import { useEffect, useState } from 'react';
import InputItem from '../components/InputItem';
import useForm from '../hooks/useForm';
import { UserCredentials, UserUnique } from '../types/User';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const { handleInputUpdate, handleSubmit } = useForm();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, []);

    function getAllUsers() {
        axios.get("/api/user/")
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

    function handleRegister(form: UserCredentials) {
        registerUser(form.email!, form.username!, form.password)
    }

    return (
        <main>
            <h2>Register</h2>
            <form onSubmit={(e) => handleSubmit(e, handleRegister)} >
                <InputItem type="email" name="email"
                    autoComplete="email" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <InputItem type="text" name="username"
                    autoComplete="username" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <InputItem type="password" name="password"
                    autoComplete="new-password" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <div>
                {userdisplay}
            </div>
        </main>
    );
};

export default RegisterPage;