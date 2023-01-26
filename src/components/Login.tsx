//로그인
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { mailCheck, passwordCheck } from "../helpers/helpers";
import { onSocialClick } from "../hooks/useLogin";

const Login = ():JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, login }:any = useLogin();

    const handleData = (event:any) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        <>
            <div className="fields">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <InputField title="이메일" error={mailCheck(error,email)} type="email" 
                        inputName="email" inputValue={email}
                        placeholder="이메일을 입력해주세요" 
                        maxlength={320} 
                        func={handleData}/>
                        <InputField title="비밀번호" error={passwordCheck(error,password)} type="password" 
                        inputName="password" inputValue={password} 
                        placeholder="비밀번호를 입력해주세요" 
                        maxlength={16} 
                        func={handleData}/>
                        <SubmitButton btnName={isPending ? '로그인 중..' : '로그인'}
                        able={!email || !password || isPending ? true:false}/>
                    </fieldset>
                </form>
                <div className="sns-login mt">
                    <p className="center">연동 로그인</p>
                    <button className="google sign-btn" name="google" onClick={onSocialClick}>
                        <i className="icon-google"></i>
                        Google로 로그인
                    </button>
                    <button className="github sign-btn" name="github" onClick={onSocialClick}>
                        <i className="icon-github"></i>
                        Github로 로그인
                    </button>
                </div>
            </div>
            <div className="another">
                계정이 없으신가요?
                <Link to="/signup">회원가입</Link>
            </div>
        </>
    );
}

export default Login;