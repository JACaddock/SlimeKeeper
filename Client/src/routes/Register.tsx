import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { UserCredentials } from '../types/User';
import axios from 'axios';

const Register = () => {
    const [form] = useForm();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
    })

    function getAllUsers() {
        axios.get("/user/")
        .then((response) => {
            setUsers(response.data)
        })
    }

    const userdisplay = users.length <= 0
        ? <p>Unable to load Users</p>
        : <>{users.map((user: UserCredentials) =>
            <div key={user.username} className="grid-row">
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                </div>
        )}
        </> 


    return (
        <main>
            <h2>Register</h2>
            {form.createRegisterForm()}
            <div className="separator-1" />
            <div className="separator-1" />
            <div className="separator-1" />
            <div>
                {userdisplay}
            </div>
        </main>
    );
};

export default Register;