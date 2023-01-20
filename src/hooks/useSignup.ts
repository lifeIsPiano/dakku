import { useState } from 'react'
import { appAuth } from '../store/fBase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    
interface SignupResult {
    error: string | null;
    isPending: boolean;
    signup: any;
}

export const useSignup = ():SignupResult => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = (email:string, password:string, displayName:string) => {
        setError(null); 
        setIsPending(true); 

        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const curUser:any = appAuth.currentUser;
                console.log(user);

                if (!user) {
                    throw new Error('회원가입에 실패했습니다.');
                }

                updateProfile(curUser, { displayName, photoURL:null })
                    .then(() => {
                        setError(null);
                        setIsPending(false);
                    }).catch((err) => {
                        setError(err.message);
                        setIsPending(false)
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
                console.log(err.message);
            });
    }

    return { error, isPending, signup }
}