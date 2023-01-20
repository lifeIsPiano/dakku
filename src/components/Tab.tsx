import { useState } from "react";
import MyPost from "../views/MyPost";
import NoList from "./NoList";
import '../assets/css/tab.scss'

const Tab = () => {
    {/* content에 들어갈 component 나중에 넣기 */}
    const tabMenu = [
        {id:0, title:'작성한 글', content:<MyPost />},
        {id:1, title:'좋아요', content:<NoList/>},
        {id:2, title:'챌린지 현황', content:<NoList/>},
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
