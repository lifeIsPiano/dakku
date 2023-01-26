import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLikes } from "../hooks/data";

const LikesButton = (postId:any) => {
    const { user } = useAuthContext();
    const {getLikes, likes, removeLike, addLike} = useLikes(postId);

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    
    useEffect(() => {
        getLikes();
    }, []);

    return (
        <button className="like" onClick={hasUserLiked ? removeLike : addLike}>
            <i className={hasUserLiked ? 'icon-full-star' : 'icon-star'}></i>
            <span>좋아요</span> {likes?.length}
        </button>
    )
}

export default LikesButton;