//이메일 로그인 뷰
import { useNavigate } from "react-router-dom";
import SignUpByMail from "../components/SignUpByMail";
import '../assets/css/sign.scss';

const JoinByMailView = ():JSX.Element => {
    const navigate=useNavigate();
    const goMain = () => {
        navigate('/')
    }

    return (
        <>
            <div className="sign-page">
                <h2 onClick={goMain}>Dakku.</h2>
                <section className="sign-content">
                    <SignUpByMail />
                </section>
            </div>
        </>
    );
}

export default JoinByMailView;