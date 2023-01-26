//다꾸 팁
import Write from "../components/Write";
import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";

const Tips = ():JSX.Element => {
    const { user } = useAuthContext();
    const { posts } = useCollection('posting',['tag','==','다꾸 팁']);

    return (
        <div className="view">
            {user && <Write />}
            <Card posts={posts}/>
        </div>
    );
}

export default Tips;