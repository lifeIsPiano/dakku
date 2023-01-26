import CardDetail from "./CardDetail";
import { replaceUrlWithLink } from "../helpers/helpers";
import '../assets/css/card.scss';

const CardPost = ({post}:any):JSX.Element => {

    return (
        <div className="card">
            <div className="prof">
                <img src={!post.icon ? `/image/userImage.png`:post.icon} alt="" className="img-small"/>
                <div className="data">
                    <h5>{post.name}</h5>
                    <p>{new Intl.DateTimeFormat('kr', {dateStyle:'long', timeStyle:'short'}).format(post.createdAt)}</p>
                </div>
            </div>
            <div className="post-content">
                    {post.post && 
                    <p dangerouslySetInnerHTML={{ __html: replaceUrlWithLink(post.post) }}></p>
                    }
                    {post.imgUrl && 
                    <div className="image-list">
                        <img src={post.imgUrl} alt="" className="card-img"/>
                    </div>
                    }
            </div>
            <div className="card-detail np">
                <CardDetail tagName={post.tag} myId={post.creatorId} postId={post.id}/>
            </div>
        </div>
    );
}

export default CardPost;