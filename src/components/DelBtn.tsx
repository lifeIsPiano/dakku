import { useNavigate, useParams } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { appFireStore } from '../store/fBase';

const DelBtn = ({commentId}:any) => {
    const { id } = useParams();
    const navigate=useNavigate();
    const commentsRef=doc(appFireStore,`posting/${id}/comments`,commentId)
    const deletePost = async () => {
        const ok = window.confirm('정말로 댓글을 삭제하시겠습니까?');
        if (ok){
            navigate(`/posting/${id}`)
            await deleteDoc(commentsRef);
        }
    }

    return (
        <button className="more" onClick={deletePost}>
            <i className="icon-trash-2"></i>
        </button>
    )
}

export default DelBtn;