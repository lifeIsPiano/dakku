//회원가입
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";

const SignUp = ():JSX.Element => {
    const navigate=useNavigate();
    const goSigninByMail = () => {
        navigate('/signup/bymail')
    }
    const auth = getAuth();

    const onSocialClick = async (event:any) => {
        const {
            target:{name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider as any);
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