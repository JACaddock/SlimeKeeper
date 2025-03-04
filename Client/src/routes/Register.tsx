import useForm from '../hooks/useForm';

const Register = () => {
    const [form] = useForm();

    return (
        <main>
            <h2>Register</h2>
            {form.createRegisterForm()}
        </main>
    );
};

export default Register;