import { useState } from "react";
import Card from "./Card";
import Likes from "./Likes";
import Progress  from "./Progress";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from '../hooks/useAuthContext';
import '../assets/css/tab.scss'

const Tab = () => {
    const { user } = useAuthContext();
    const { posts } = useCollection('posting',['creatorId','==',user.uid]);

    const tabMenu = [
        {id:0, title:'작성한 글', content:<Card posts={posts} />},
        {id:1, title:'좋아요', content:<Likes />},
        {id:2, title:'챌린지 현황', content:<Progress />},
    ]
    const [index, setIndex] = useState(0);

    return (
        <>
            <ul className="tab">
                {tabMenu.map(item=>(
                    <li 
                    key={item.id} 
                    className={index === item.id ? 'active' : ''} 
                    onClick={() => setIndex(item.id)}>
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="tabContent">
                {tabMenu.filter(item => index === item.id).map(item=>(
                    <div key={item.id}>
                        {item.content}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tab;
