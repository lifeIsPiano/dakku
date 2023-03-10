import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { appFireStore } from "../store/fBase";
import { doc, deleteDoc }from"firebase/firestore";
import { useCollection } from "../hooks/useCollection";
import CardShare from "./CardShare";
import LikesButton from "./LikesButton";
import { shareWeb } from "../helpers/helpers";

type Test={
    tagName:string,
    myId:any,
    postId:string,
}

export const CardDetail = ({tagName, myId, postId}:Test):JSX.Element => {
    const { user } = useAuthContext();
    const { id }:any = useParams();
    const navigate=useNavigate();

    const { posts:comments } = useCollection(`posting/${!postId ? id : postId}/comments`,['createdAt','>=',0]);
    
    const PostRef=doc(appFireStore,'posting',`${!postId ? id : postId}`)
    const deletePost = async () => {
        const ok = window.confirm('정말로 포스트를 삭제하시겠습니까?');
        if (ok){
            navigate('/')
            await deleteDoc(PostRef);
        }
    }

    return (
        <>
            <span className="tag">{tagName === '' ? '전체 글' : tagName}</span>
            <button className="comment" onClick={()=>navigate(`/posting/${!postId ? id : postId}`)}>
                <i className="icon-message-circle"></i>
                댓글 {comments.length}
            </button>
            <LikesButton postId={!postId ? id : postId}/>
            <CardShare shareSNS={!postId ? id : postId} shareLink={()=>shareWeb(!postId ? id : postId)}/>
            {!user || myId !== user.uid ? null: (
                <button className="more" onClick={deletePost}>
                    <i className="icon-trash-2"></i>
                </button>
            )}
        </>
    )
}

export default CardDetail;