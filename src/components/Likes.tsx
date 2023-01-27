import Card from "../components/Card";
import NoList from "./NoList";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLikeCol } from "../hooks/data";

const Likes = ():JSX.Element => {
    const { user } = useAuthContext();
    const { likedId } = useLikeCol(user.uid);

    if(likedId.length === 0){
        return <NoList />
    }

    return <Posts likedId={likedId} />
}

interface PostsProps {
    likedId: string[];
}

const Posts = (props:PostsProps) => {
    const { posts } = useCollection('posting',['id','in', props.likedId])
    return (
        <Card posts={posts}/>
    );
}

export default Likes;