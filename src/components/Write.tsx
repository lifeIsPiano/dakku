//글 작성 구간
import React, { useRef, useCallback, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { appFireStore, storage } from "../store/fBase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import '../assets/css/write.scss'

const Write = ():JSX.Element => {
    const { user } = useAuthContext();
    const [post,setPost] = useState('');
    const [imgLoad, setImgLoad] = useState('');

    //textarea 사이즈 변화
    const textRef:any = useRef<HTMLElement>(null);
    const handleResizeHeight = useCallback(() => {
        if (textRef === null || textRef.current === null) return;
        textRef.current.style.height = '90px';
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
        let imgUrl='';
        //텍스트만 올리기
        if (imgUrl !== ''){
            const fileRef = ref(storage, `${user.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, imgLoad, 'data_url')
            imgUrl=await getDownloadURL(fileRef);
        }

        await addDoc(collection(appFireStore, "posts"), {
            post,
            createdAt: Date.now(),
            creatorId:user.uid,
            name:user.displayName,
            likes:[],
            comments:[],
            imgUrl,
            icon:user.photoURL,
            tag:'',
        });
        setPost("");
        setInputCount(0);
        setImgLoad("");
    }

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{files}} = event;
        const ImgFile = files![0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
            const {
                currentTarget : {result}
            } = finishedEvent;
            setImgLoad(result);
        }
        reader.readAsDataURL(ImgFile);
    }

    const onClearImgClick = () => {
        setImgLoad('');
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
                    {imgLoad && 
                    <div className="imgWrapper">
                        <span className="delImg" onClick={onClearImgClick}>
                            <i className="icon-x"></i>
                        </span>
                        <img src={imgLoad} alt="" className="uploadImg"/>
                    </div>
                    }
                </div>
                <div className="upload-btn">
                    <select name="" id="">
                        <option value="">전체</option>
                        <option value="다꾸 팁">다꾸 팁</option>
                        <option value="후기 및 추천">후기 및 추천</option>
                        <option value="챌린지">챌린지</option>
                    </select>
                    <label htmlFor="file">
                        <div className="upload">
                            <i className="icon-image"></i>
                        </div>
                    </label>
                    <input type="file" name="file" id="file" accept="image/*" onChange={onFileChange} />
                    <button className="upload" type="submit" disabled={post === '' ? true : false}>
                        <i className="icon-edit-3"></i>
                    </button>
                </div>
            </form>
            <span className="countChar">{inputCount}/500</span>
        </div>
    );
}

export default Write;