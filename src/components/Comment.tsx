//댓글
import { format, register } from 'timeago.js';
import { useAuthContext } from "../hooks/useAuthContext";
import DelBtn from './DelBtn';
import koLocale from 'timeago.js/lib/lang/ko';
import '../assets/css/comment.scss';

const Comment = ({comments,origin}:any):JSX.Element => {
    const { user } = useAuthContext();
    register('ko', koLocale);

    return (
        <>
        {0 < comments.length && comments.map((comment:any)=>(
            <div className="comment-msg" key={comment.id}>
                <div className="prof">
                    <img src={comment.icon ? comment.icon : `/image/userImage.png`} alt="" className="img-small" />
                    <div className="data">
                        <h5>{comment.name}</h5>
                        <span className="time">{format(comment.createdAt,'ko')}</span>
                    </div>
                    {!user || comment.creatorId !== user.uid ? null :
                    (<DelBtn commentId={comment.id} />)
                    }
                </div>
                <p>
                    <span>{`@${origin}`}</span>
                    {comment.comment}
                </p>
            </div>
        ))}
        </>
    );
}

export default Comment;