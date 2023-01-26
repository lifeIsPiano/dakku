import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { storage } from '../store/fBase';
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import '../assets/css/modal.scss';

const ProfileEdit = ({click}:any):JSX.Element => {
    const { user } = useAuthContext();
    const [newDisplayName,setNewDisplayName] = useState(user.displayName);
    const [newImg, setNewImg] = useState(!user.photoURL ? "/image/userImage.png": user.photoURL);

    const changeName = (event:any) => {
        const {target: {value}}=event;
        setNewDisplayName(value);
    }

    const updateNewProf= async (event:any)=>{
        event.preventDefault();
        let imgUrl='';
        if (newImg !== '' || user.photoURL !== imgUrl){
            const fileRef = ref(storage, `${user.uid}/${uuidv4()}`);
            await uploadString(fileRef, newImg, 'data_url');
            imgUrl=await getDownloadURL(fileRef);
        }

        if (user.displayName !== newDisplayName){
            await updateProfile(user,{
                displayName:newDisplayName,
                photoURL:imgUrl,
            });
        }
        //닉네임만 바꾸는게 안됨
    }

    const onFileChange = (event:any) => {
        const {target:{files}} = event;
        const ImgFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent:any) => {
            const {
                currentTarget : {result}
            } = finishedEvent;
            setNewImg(result);
        }
        reader.readAsDataURL(ImgFile);
    }

    useEffect(()=>{
        if (user?.photoURL){
            setNewImg(user.photoURL)
        }
    },[user])

    return (
        <div className="modal">
            <div className="edit box">
                <h3>프로필 수정</h3>
                <section className='mt'>
                    <form className="editing" onSubmit={updateNewProf}>
                        <div className="updateImg">
                            <img src={newImg} alt="프로필 이미지" className="img-large"/>
                            <label htmlFor="file">
                                <div className="upload">
                                    <i className="icon-edit-3"></i>
                                </div>
                            </label>
                            <input type="file" name="file" id="file" accept="image/*" onChange={onFileChange}/>
                        </div>
                        <input type="text" 
                        className='change-name' 
                        onChange={changeName}
                        value={newDisplayName} />
                        <section className='btn-sec'>
                            <input type="submit" className="btn-modal save" value="저장" />
                            <button onClick={click} className="btn cancel">닫기</button>
                        </section>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ProfileEdit;