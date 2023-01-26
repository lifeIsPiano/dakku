import { collection,query, getDocs, addDoc, where, deleteDoc, doc, onSnapshot, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../store/fBase";
import { useAuthContext } from "./useAuthContext";
import { useDocumentData } from 'react-firebase-hooks/firestore';

interface Like {
    likeId: string;
    userId: string;
} 

export const usePost=(id:any)=>{
    const q=doc(appFireStore,'posting',id)
    const [post,isLoading] = useDocumentData(q);

    return {post,isLoading}
}

export const useMyChallenge=(id:any)=>{
    const [challenge,setChallenge] = useState([]);
    useEffect(()=> {
        const postRef = collection(appFireStore, "posting");
        const postDoc = query(postRef, where("creatorId","==",id),where("tag", "==", "챌린지"));
        const unsubscribe = onSnapshot(postDoc, querySnapshot => {
            const newArray:any = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setChallenge(newArray);
        });
            return () => {
                unsubscribe();
            };
        },[collection])
    return { challenge }
}

export const useLikes = (postId:string) => {
    const { user } = useAuthContext();
    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(appFireStore, "likes");
    const likesDoc = query(likesRef, where("postId", "==", postId));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
            );
        };
        const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId,
                });
                    if (user) {
                    setLikes((prev) =>
                        prev
                        ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                        : [{ userId: user.uid, likeId: newDoc.id }]
                    );
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const removeLike = async () => {
            try {
                const likeToDeleteQuery = query(
                    likesRef,
                    where("postId", "==", postId),
                    where("userId", "==", user?.uid)
                );
        
                const likeToDeleteData = await getDocs(likeToDeleteQuery);
                const likeId = likeToDeleteData.docs[0].id;
                const likeToDelete = doc(appFireStore, "likes", likeId);
                await deleteDoc(likeToDelete);
                if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                    );
                }
            } catch (err) {
                console.log(err);
            }
        };
    return {getLikes, likes, removeLike, addLike}
}

export const useLikeCol = (id:string) => {
    const [likes, setLikes] = useState([]);
    useEffect(()=> {
        const likesRef = collection(appFireStore, "likes");
        const likesDoc = query(likesRef, where("userId", "==", id));
        const unsubscribe = onSnapshot(likesDoc, querySnapshot => {
            const newArray:any = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setLikes(newArray);
        });
            return () => {
                unsubscribe();
            };
        },[collection])
        
        const likedId=likes.map((like:any)=>{
            return like.postId.postId
        })
    
    return { likes, likedId } 
}