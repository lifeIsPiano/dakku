//작성한 글
import CardDetail from "./CardDetail";
import { useState, useEffect } from "react";
import { appFireStore } from "../store/fBase";
import NoList from "./NoList";
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import '../assets/css/card.scss';

const Card = () => {
    const [posts, setPosts] = useState<any[]>([]);
    register('ko', koLocale);

    useEffect(()=>{
        const list = query(collection(appFireStore,'posts'),
        orderBy("createdAt","desc"));
        const unsubscribe = onSnapshot(list, querySnapshot => {
            const newArray = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setPosts(newArray);
            });
        return () => {
            unsubscribe();
        };
    },[collection])

    return (
        <>
        {0 < posts.length && posts.map((post)=>(
            <div className="card" key={post.id} id={post.creatorId}>
                <div className="prof">
                    <img src={post.icon === null ? '/image/userImage.png' : post.icon} alt="" className="img-small"/>
                    <div className="data">
                        <h5>{post.name}</h5>
                        <p>{format(post.createdAt,'ko')}</p>
                    </div>
                </div>
                <div className="content">
                    <p>
                        {post.post}
                    </p>
                    {/* <div className="image-list">
                        <img src="" alt="" />
                    </div> */}
                </div>
                <div className="card-detail">
                    <CardDetail/>
                </div>
            </div>
        ))}
        {posts.length === 0 && <NoList />}
        </>
    );
}

export default Card;
