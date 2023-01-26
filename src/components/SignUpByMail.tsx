//메일로 회원가입
import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useSignup } from "../hooks/useSignup";
import { mailCheck, passwordCheck } from "../helpers/helpers";

const SignUpByMail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const { error, isPending, signup }:any = useSignup();

    const handleData = (event:any) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        } else if (event.target.type === "text") {
            setDisplayName(event.target.value);
        }
    }

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        signup(email, password, displayName);
    }
    //작성한 조건에 맞지 않으면 버튼 disabled되게 할 수 있나?
    
    return (
        <div className="fields">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <InputField title="이메일" error={mailCheck(error,email)}
                    type="email" 
                    inputName="email" inputValue={email}
                    placeholder="이메일을 입력해주세요" 
                    maxlength={320} 
                    func={handleData}/>
                    <InputField title="닉네임" error="" type="text" 
                    inputName="nickname" inputValue={displayName}
                    placeholder="닉네임을 입력해주세요" 
                    maxlength={12} 
                    func={handleData}/>
                    <InputField title="비밀번호" error={passwordCheck(error,password)} type="password" 
                    inputName="password" inputValue={password}
                    placeholder="비밀번호를 입력해주세요" 
                    maxlength={16} 
                    func={handleData}/>
                    <SubmitButton btnName={isPending ? '가입 중..' : '회원가입'} able={!email || !password || !displayName || error ? true:false} />
                </fieldset>
            </form>
        </div>
    )
}

export default SignUpByMail;