//타임라인에서 카드를 클릭 시 상세 내용 및 댓글 확인 가능한 창
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/data";
import { useAuthContext } from "../hooks/useAuthContext";
import Bar from "./Bar";
import CardPost from "./CardPost";
import Comment from "./Comment";
import Loading from "./Loading";
import WriteComment from "./WriteComment";
import { useCollection } from "../hooks/useCollection";

const CardView = ():JSX.Element => {
    const { user } = useAuthContext();
    const { id }:any = useParams();
    const { post, isLoading } = usePost(id);
    const { posts:comments } = useCollection(`posting/${id}/comments`,['createdAt','>=',0])

    return (
        <div className="view no-padding">
            {isLoading ? <Loading/> : (
                <>
                <Bar category="포스트"/>
                {!isLoading && <CardPost post={post}/>}
                {user ? <WriteComment /> : null}
                <Comment comments={comments} origin={post?.name}/>
                </>
            )}
        </div>
    );
}

export default CardView;