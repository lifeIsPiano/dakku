import { useAuthContext } from '../hooks/useAuthContext';
import '../assets/css/modal.scss';

const ProfileEdit = ({click}:any):JSX.Element => {
    const { user } = useAuthContext();

    return (
        <div className="modal">
            <div className="edit box">
                <h3>프로필 수정</h3>
                <section className='mt'>
                    <img src={user.photoURL === null ? "/image/userImage.png": user.photoURL} alt="" className="img-large"/>
                    <div className="editing">
                        <p className=''>닉네임 변경</p>
                        <p className='mt'>이미지 변경</p>
                    </div>
                </section>
                <section className='btn-sec'>
                    <button onClick={click} className="save">저장</button>
                    <button onClick={click} className="cancel">취소</button>
                </section>
            </div>
        </div>
    );
}

export default ProfileEdit;