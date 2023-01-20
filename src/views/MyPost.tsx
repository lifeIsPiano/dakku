import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";

const MyPost = ():JSX.Element => {
    const { user } = useAuthContext();
    // const { posts, error } = useCollection('posts',['uid','==', user.uid]);

    return (
        <>
            <Card />
        </>
    );
}

export default MyPost;