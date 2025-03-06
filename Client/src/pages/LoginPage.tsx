import InputItem from '../components/InputItem';
import useForm from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { UserCredentials } from '../types/User';

const LoginPage = () => {
    const { loginUser } = useAuth();
    const { handleInputUpdate, handleSubmit } = useForm();

    function handleLogin(form: UserCredentials) {
        loginUser(form.username!, form.password)
    }

    return (
        <main>
            <h2>Login</h2>
            <form onSubmit={(e) => handleSubmit(e, handleLogin)} >
                <InputItem type="text" name="username"
                    autoComplete="username" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <InputItem type="password" name="password"
                    autoComplete="current-password" required={true}
                    handleInputUpdate={handleInputUpdate} />

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </main>
    );
};

export default LoginPage;