import { appFireStore } from "../store/fBase"
import { useEffect, useState } from "react"
import { onSnapshot, collection, query, orderBy, where, } from "firebase/firestore";
import { WhereFilterOp } from "firebase/firestore";

type PostType = {
    id: string,
    name: string
}

export const useCollection = (transaction:string,section:[string,WhereFilterOp,any]) => {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const list = query(collection(appFireStore,transaction),
        where(...section),
        orderBy("createdAt","desc"),
        );
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