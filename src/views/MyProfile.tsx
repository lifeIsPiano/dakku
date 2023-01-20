//내 프로필
import Bar from "../components/Bar";
import Tab from "../components/Tab";
import ProfileEdit from "../components/ProfileEdit";
import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'
import '../assets/css/profile.scss';

const MyProfile = ():JSX.Element => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [modalOpen, setModalOpen] = useState(false);

    const createdTime = new Intl.DateTimeFormat('kr').format(user.metadata.createdAt);
    
    return (
        <div className="view no-padding">
            <Bar category="내 프로필"/>
            <div className="prof-data">
                <div className="prof">
                    <img src={user.photoURL === null ? "/image/userImage.png" : user.photoURL} alt={``} className="prof-img-large" />
                    <div className="data">
                        <div className="user">
                            <h5>{user.displayName !== null ? user.displayName : 'UserName'}</h5>
                            <p>{user.email}</p>
                        </div>
                        <div className="info">
                            <p>작성한 글: {2}</p>
                            <p>좋아요: {30}</p>
                            <p>가입일: {createdTime}</p>
                        </div>
                    </div>
                    <div className="user-change">
                        <button className="change" onClick={()=>{setModalOpen(true)}}>
                            <i className="icon-edit"></i>
                        </button>
                        <button className="logout" onClick={logout}>
                            <i className="icon-log-out"></i>
                        </button>
                    </div>
                </div>
            </div>
            <Tab />
            {modalOpen && <ProfileEdit click={()=>{setModalOpen(false)}}/>}
        </div>
    );
}

export default MyProfile;