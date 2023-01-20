//타임라인에서 카드를 클릭 시 상세 내용 및 댓글 확인 가능한 창
//Card 컴포넌트 재활용
import { useParams } from "react-router-dom";
import Bar from "./Bar";
import CardPost from "./CardPost";
import Comment from "./Comment";
import Write from "./Write";

const CardView = ():JSX.Element => {
    //useParams로 개별 아이템 가져와서 데이터 보여주기
    return (
        <div className="view no-padding">
            <Bar category="포스트"/>
            <CardPost />
            <Write />
            <Comment />
        </div>
    );
}

export default CardView;