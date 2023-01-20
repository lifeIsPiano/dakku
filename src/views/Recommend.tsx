//추천 및 후기
import Write from "../components/Write";
import { useAuthContext } from '../hooks/useAuthContext';

const Recommend = ():JSX.Element => {
    const { user } = useAuthContext();

    return (
        <div className="view">
            {user && <Write />}
        </div>
    );
}

export default Recommend;