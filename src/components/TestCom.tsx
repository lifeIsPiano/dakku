import { Link } from "react-router-dom";

const TestCom = ({likes}:any) => {

    return (
        <>
        {likes.map((like:any, index:number)=>(
            <div key={like.postId.postId}>
            <Link to={`/posting/${like.postId.postId}`} >
                {like.postId.postId}
            </Link>
            <br/>
            <p>{index}</p>
            </div>
        ))}
        </>
    )
}

export default TestCom;