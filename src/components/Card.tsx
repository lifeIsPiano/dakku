//작성한 글
import CardDetail from "./CardDetail";
import NoList from "./NoList";
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import '../assets/css/card.scss';

const Card = ({posts}:any) => {
    register('ko', koLocale);

    return (
        <>
        {0 < posts.length && posts.map((post:any)=>(
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
                    {post.imgUrl && 
                    <div className="image-list">
                        <img src={post.imgUrl} alt="" className="card-img"/>
                    </div>
                    }
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
