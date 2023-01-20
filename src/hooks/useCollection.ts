import { appFireStore } from "../store/fBase"
import { useEffect, useState } from "react"
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";

export const useCollection = (transaction:any, myQuery: any[]) => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let q;
        // if (myQuery) {
        //     q = query(collection(appFireStore, transaction), where(...myQuery), orderBy("createdTime", "desc"));
        // }
        const unsubscribe = onSnapshot(collection(appFireStore, transaction),

            (snapshot) => {
                let result:any = [];
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id });
                })

                setPosts(result);
                setError(null);
            },
            (error) => {
                setError(error.message);
            });
        return unsubscribe;
    }, [collection])

    return { posts, error }
}

//따로 파일 분리해서 하려고 하니까 계속 null을 출력하는 문제가 있음...
//프로필 페이지에서 로그인한 사용자의 글만 보이도록 필터링하려면 where로 query 기능 쓰라는 내용 참고해서 작성하려고 하니 myQuery 의 타입 문제가 있어서 어떻게 작성해야 할 지 모르겠음