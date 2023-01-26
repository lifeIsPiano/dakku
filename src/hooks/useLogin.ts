import { useState } from 'react'
import { appAuth } from '../store/fBase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = (email:string, password:string) => {
        setError(null); 
        setIsPending(true); 

        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'login', payload: user });
                setError(null);
                setIsPending(false);
                if (!user) {
                    throw new Error('로그인에 실패했습니다.');
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
                console.log(err.message);
            });
    }

    return { error, isPending, login }
}

export const onSocialClick = async (event:any) => {
    const auth = getAuth();
    const {
        target:{name},
    } = event;
    let provider;
    if (name === "google"){
        provider = new GoogleAuthProvider();
    } else if (name === "github"){
        provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider as any);
}