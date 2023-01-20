//댓글
import '../assets/css/comment.scss';

const Comment = ():JSX.Element => {
    return (
        <div className="comment-msg">
            <div className="prof">
                <img src={`/image/userImage.png`} alt="" className="img-small" />
                <div className="data">
                    <h5>{`Very very Nickname`}</h5>
                    <span className="time">{`10초 전`}</span>
                </div>
            </div>
            <p>
                <span>{`@${`Nickname`}`}</span>
                Minus saepe quidem unde laboriosam corrupti rem qui maxime dolorum, vero iure natus veritatis incidunt!
                Vitae mollitia deleniti nostrum corrupti. Sapiente, nulla!
                Neque quidem reprehenderit
            </p>
        </div>
    );
}

export default Comment;