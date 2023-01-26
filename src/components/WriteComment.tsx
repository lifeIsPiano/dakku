import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { appFireStore } from "../store/fBase";
import { collection, addDoc } from "firebase/firestore";
import '../assets/css/write.scss';

const WriteComment = ():JSX.Element => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [comment,setComment] = useState('');
    const [inputCount, setInputCount] = useState(0);

    const textRef:any = useRef<HTMLElement>(null);
    const handleResizeHeight = useCallback(() => {
        if (textRef === null || textRef.current === null) return;
        textRef.current.style.height = '90px';
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    },[])

    const onInputHandler = (e:any) => {
        setInputCount(e.target.value.length);
        setComment(e.target.value)
    };

    const onSubmit = async (event:any) => {
        event.preventDefault();
        const commentsRef=collection(appFireStore,`posting/${id}/comments`)

        await addDoc(commentsRef, {
            comment,
            createdAt: Date.now(),
            creatorId:user.uid,
            name:user.displayName,
            icon:user.photoURL,
        });
        setComment("");
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
                    value={comment}
                    />
                </div>
                <div className="upload-btn">
                    <button className="upload" type="submit" disabled={comment === '' ? true : false}>
                        <i className="icon-edit-3"></i>
                    </button>
                </div>
            </form>
        <span className="countChar">{inputCount}/500</span>
    </div>
    );
}

export default WriteComment;