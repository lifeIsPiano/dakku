//좌측 메뉴바
import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation } from "react-router-dom";
import '../assets/css/sidemenu.scss'

const SideMenu = () => {
    const { user } = useAuthContext();
    const locationNow = useLocation();
    const current = locationNow.pathname.replace('/','');
    const [name, setName] = useState('');

    if (locationNow.pathname.includes('/signup') || locationNow.pathname.includes('/login')) return null;

    const menus = [
        {id:0, name: '', icon:'home', title: '전체'},
        {id:1, name: 'tips', icon:'tip', title: '다꾸 팁'},
        {id:2, name: 'recommend', icon:'community', title: '후기 및 추천'},
        {id:3, name: 'challenge', icon:'award', title: '챌린지'},
    ];

    const userMenu = [
        {id:4, name: 'likes', icon:'shiny-star', title: '좋아요 한 글'},
        {id:5, name: 'my-profile', icon:'user', title: '내 프로필'},
    ]
    
    return (
        <div className="side-menu">
            {menus.map((item)=>(
                <Link 
                className={current === item.name ? 'menu-item active' : 'menu-item'} 
                to={`/${item.name}`} 
                key={item.id} 
                onClick={() => setName(item.name)}>
                    <i className={`icon-${item.icon}`}></i>
                    {item.title}
                </Link>
            ))}
            {/* 로그인 시 나타나는 메뉴 */}
            {user && (
                userMenu.map((item)=>(
                    <Link 
                    className={current === item.name ? 'menu-item active' : 'menu-item'} 
                    to={`/${item.name}`} 
                    key={item.id} 
                    onClick={() => setName(item.name)}>
                        <i className={`icon-${item.icon}`}></i>
                        {item.title}
                    </Link>
                ))
            )}
        </div>
    );
}

export default SideMenu;