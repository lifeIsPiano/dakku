import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";

const MyPost = ():JSX.Element => {
    const { user } = useAuthContext();
    const { posts } = useCollection('posts');

    return (
        <>
            <Card posts={posts}/>
        </>
    );
}

export default MyPost;