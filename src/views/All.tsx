//타임라인
import Write from "../components/Write";
import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";

const All = ():JSX.Element => {
    const { user } = useAuthContext();
    const { posts } = useCollection('posts',['creatorId','==',user.uid]);

    return (
        <div className="view">
            {user && <Write />}
            <Card />
        </div>
    );
}

export default All;