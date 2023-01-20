import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import '../assets/css/sign.scss'

const LoginPage = ():JSX.Element => {
    const navigate=useNavigate();
    const goMain = () => {
        navigate('/')
    }

    return (
        <div className="sign-page">
            <h2 onClick={goMain}>Dakku.</h2>
            <section className="sign-content">
                <Login />
            </section>
        </div>
    );
}

export default LoginPage;