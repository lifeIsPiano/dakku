//작성한 글
import CardDetail from "./CardDetail";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import '../assets/css/card.scss';

const Card = ({posts}:any) => {
    register('ko', koLocale);
    
    return (
        <>
        {0 < posts.length ? posts.map((post:any)=>(
            <div className="card" id={post.creatorId} key={post.id}>
                <div className="prof">
                    <img src={!post.icon ? '/image/userImage.png' : post.icon} alt="" className="img-small"/>
                    <div className="data">
                        <h5>{post.name}</h5>
                        <p>{format(post.createdAt,'ko')}</p>
                    </div>
                </div>
                <Link to={`/posting/${post.id}`}>
                    <div className="content">
                        {post.post && 
                        <p>{post.post}</p>
                        }
                        {post.imgUrl && 
                        <div className="image-list">
                            <img src={post.imgUrl} alt="" className="card-img"/>
                        </div>
                        }
                    </div>
                </Link>
                <div className="card-detail">
                    <CardDetail tagName={post.tag} myId={post.creatorId} postId={post.id} />
                </div>
            </div>
        )): <Loading />}
        </>
    );
}

export default Card;
