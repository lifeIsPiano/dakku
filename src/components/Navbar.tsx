//상단 내비게이션 바
//로고, 회원가입/로그인,프로필이미지
import { Link, useLocation } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from "react";
import '../assets/css/navMenu.scss';

const Navbar = () => {
    const [isHovering, setIsHovering] = useState(0);
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const locationNow = useLocation();

    if (locationNow.pathname.includes('/signup') || locationNow.pathname.includes('/login') ) return null;

    return (
        <div className="nav-menu">
            <nav>
                <Link to="/">
                    <h2 className="logo">Dakku.</h2>
                </Link>
                <div className="sub">
                    {/* 로그인 x */}
                    {!user && <>
                        <Link to="/signup" className="btn sign-up">회원가입</Link>
                        <Link to="/login" className="btn login">로그인</Link>
                    </>}
                    {/* 로그인O */}
                    {user && 
                    <div className="logged-in" 
                    onMouseOver={() => setIsHovering(1)} 
                    >
                        <img src={user.photoURL === null ? "/image/userImage.png" : user.photoURL} alt={`${user.displayName !== '' ? user.displayName : 'UserName'}님의 프로필 이미지`} className="nav-prof"/>
                        <p>{user.displayName !== null ? user.displayName : 'UserName'}</p>
                    </div>}
                    {isHovering ? 
                    (<div className="prof-modal" onMouseOut={() => setIsHovering(0)}>
                        <Link to="/my-profile" onMouseOver={() => setIsHovering(1)}>프로필</Link>
                        <button type="button" onClick={logout} onMouseOver={() => setIsHovering(1)}>로그아웃</button> 
                    </div>) 
                    : null}
                </div>
            </nav>
            
        </div>
    );
}

export default Navbar;