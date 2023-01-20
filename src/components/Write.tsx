//글 작성 구간
import { useRef, useCallback, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import '../assets/css/write.scss'
import { appFireStore } from "../store/fBase";
import { collection, addDoc, serverTimestamp, query, getDocs } from "firebase/firestore";

const Write = ():JSX.Element => {
    const { user } = useAuthContext();
    const [post,setPost] = useState('');

    //textarea 사이즈 변화
    const textRef:any = useRef<HTMLElement>(null);
    const handleResizeHeight = useCallback(() => {
        if (textRef === null || textRef.current === null) return;
        textRef.current.style.height = '60px';
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    },[])

    const [inputCount, setInputCount] = useState(0);
    const onInputHandler = (e:any) => {
        setInputCount(e.target.value.length);
        setPost(e.target.value)
    };

    //textarea value
    const onSubmit = async (event:any) => {
        event.preventDefault();
        await addDoc(collection(appFireStore, "posts"), {
            post,
            createdAt: Date.now(),
            creatorId:user.uid,
            name:user.displayName,
            likes:[],
            comments:[],
            icon:user.photoURL,
            tag:'',
        });
        setPost("");
        setInputCount(0);
    }

    return (
        <div className="write">
            <img src={user.photoURL === null ? '/image/userImage.png' : user.photoURL} alt={``} className="img-small"/>
            <form className="wrap" id="goPost" method="get" onSubmit={onSubmit}>
                <div className="txt-area">
                    <textarea name="" id="goPost" ref={textRef} 
                    cols={30} rows={10} maxLength={500} 
                    placeholder='오늘은 무슨 일이 있었나요?'
                    className="autoTextarea"
                    onInput={handleResizeHeight} 
                    onChange={onInputHandler}
                    value={post}
                    />
                </div>
                {/* 이미지 업로드 시 textarea 하단에 이미지가 들어오게 */}
                <div className="upload-btn">
                    <label htmlFor="file">
                        <div className="upload">
                            <i className="icon-image"></i>
                        </div>
                    </label>
                    <input type="file" name="file" id="file" />
                    <button className="upload" type="submit">
                        <i className="icon-edit-3"></i>
                    </button>
                </div>
            </form>
            <span className="countChar">{inputCount}/500</span>
        </div>
    );
}

export default Write;