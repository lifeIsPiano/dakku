import { appFireStore } from "../store/fBase"
import { useEffect, useState } from "react"
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";

export const useCollection = (transaction:any) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const list = query(collection(appFireStore,transaction),
        // where("creatorId","==", id),
        orderBy("createdAt","desc"));
        const unsubscribe = onSnapshot(list, querySnapshot => {
            const newArray:any = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setPosts(newArray);
            });
        return () => {
            unsubscribe();
        };
    }, [collection])

    return { posts }
}

//프로필 페이지에서 로그인한 사용자의 글만 보이도록 필터링하려면 where로 query 기능 쓰라는 내용 참고해서 작성하려고 하니 myQuery 의 타입 문제가 있어서 어떻게 작성해야 할 지 모르겠음