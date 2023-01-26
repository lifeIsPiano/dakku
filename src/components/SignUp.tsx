//회원가입
import { Link, useNavigate } from "react-router-dom";
import { onSocialClick } from "../hooks/useLogin";

const SignUp = ():JSX.Element => {
    const navigate=useNavigate();
    const goSigninByMail = () => {
        navigate('/signup/bymail')
    }

    return (
        <>
            <div className="login-section">
                <button onClick={goSigninByMail} className="email sign-btn">이메일로 회원가입</button>
                <button className="google sign-btn" name="google" onClick={onSocialClick}>
                    <i className="icon-google"></i>
                    Google로 회원가입
                </button>
                <button className="github sign-btn" name="github" onClick={onSocialClick}>
                    <i className="icon-github"></i>
                    Github로 회원가입
                </button>
            </div>
            <div className="another">
                계정이 있으신가요?
                <Link to="/login">로그인</Link>
            </div>
        </>
    );
}

export default SignUp;