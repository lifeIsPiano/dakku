//회원가입, 로그인 페이지 전반적인 레이아웃
//따로 해야 할지 말지 고민좀 해보고
import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";
import '../assets/css/sign.scss'

const SignUpPage = ():JSX.Element => {
    const navigate=useNavigate();
    const goMain = () => {
        navigate('/')
    }

    return (
        <div className="sign-page">
            <h2 onClick={goMain}>Dakku.</h2>
            <section className="sign-content">
                <SignUp />
            </section>
        </div>
    );
}

export default SignUpPage;

// 로그인(전체) / 회원가입(전체) / 이메일 회원가입