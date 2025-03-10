import InputItem from '../components/InputItem';
import useForm from '../hooks/useForm';
import { UserCredentials } from '../types/User';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const { handleInputUpdate, handleSubmit } = useForm();

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
        </main>
    );
};

export default RegisterPage;