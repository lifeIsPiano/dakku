//추천 및 후기
import Write from "../components/Write";
import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";

const Recommend = ():JSX.Element => {
    const { user } = useAuthContext();
    const { posts } = useCollection('posting',['tag','==','후기 및 추천']);

    return (
        <div className="view">
            {user && <Write />}
            <Card posts={posts}/>
        </div>
    );
}

export default Recommend;