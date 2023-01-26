import Card from "../components/Card";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLikeCol } from "../hooks/data";

const Likes = ():JSX.Element => {
    const { user } = useAuthContext();
    const { likedId }:any = useLikeCol(user.uid);

    const { posts } = useCollection('posting',['id','in', likedId])
    //array-contains 로 하면 에러는 안 나는데 로드가 안 되고
    //in이나 array-contains-any 로 하면 페이지 들어갈 때 에러가 남...
    //array-contains나 == 로 설정하고서 들어간 이후에 in 으로 바꿔서 저장해주면 로드가 됨
    //어떤 부분이 문제인지 정확히 원인을 모르겠음..

    //in 으로 했을 때 출력되는 오류
    //invalid query. a non-empty array is required for 'in' filters

    return (
        <>
        {user && <Card posts={posts}/>}
        </>
    );
}

export default Likes;