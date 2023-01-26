import { appFireStore } from "../store/fBase"
import { useEffect, useState } from "react"
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";

export const useCollection = (transaction:any,section:[any,any,any]) => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const list = query(collection(appFireStore,transaction),
        where(...section),
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