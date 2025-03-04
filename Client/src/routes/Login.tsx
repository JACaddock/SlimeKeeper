import useForm from '../hooks/useForm';

const Login = () => {

    const [form] = useForm();

    return (
        <main>
            <h2>Login</h2>
            {form.createLoginForm()}
        </main>
    );
};

export default Login;