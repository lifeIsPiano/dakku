import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { appFireStore } from "../store/fBase";
import { doc, deleteDoc }from"firebase/firestore";
import { useCollection } from "../hooks/useCollection";
import CardShare from "./CardShare";
import LikesButton from "./LikesButton";

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

    const shareWeb = () => {
        if (navigator.clipboard){
            navigator.clipboard
            .writeText(`http://localhost:5173/posting/${!postId ? id : postId}`)
            .then(()=>{
                alert('포스트 링크가 복사되었습니다.')
            })
            .catch(()=>{
                alert('복사에 실패했습니다.')
            })
        } else {
            alert('복사 기능 미지원 브라우저입니다.')
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
            <CardShare shareSNS={!postId ? id : postId} shareLink={shareWeb}/>
            {!user || myId !== user.uid ? null: (
                <button className="more" onClick={deletePost}>
                    <i className="icon-trash-2"></i>
                </button>
            )}
        </>
    )
}

export default CardDetail;