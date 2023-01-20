import { useState } from "react";
import Confirm from "./Confirm";

type InputText = {
    title:string;
    error:any;
    type:string;
    inputName:string;
    inputValue:string;
    placeholder:string;
    maxlength:number;
    func:any;
} & typeof defaultProps;

const defaultProps={
    title:'',
    type:'',
    inputName:'',
    placeholder:'',
    maxlength:8,
}

const InputField = 
({title, error, type, inputName, inputValue, placeholder, maxlength, func}:InputText) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="title mt">
                <div className="group">
                    <label className="labelTitle" htmlFor={inputName}>{title}</label>
                    <i className={title === '비밀번호' ? 'icon-info':''} onClick={()=>{setModalOpen(true)}}></i>
                </div>
                <span>{error}</span>
                {/* 에러 발생 시 error 문구 출력하고 아니면 '' */}
            </div>
            <input type={type} className="text-input" 
            id={inputName}
            placeholder={placeholder} 
            maxLength={maxlength} required value={inputValue || ""} 
            onChange={func}
            />
            {modalOpen && <Confirm click={()=>{setModalOpen(false)}}/>}
        </>
    );
}

export default InputField;