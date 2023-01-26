import { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from '../store/fBase';

const AuthContext = createContext({});

const authReducer = (state: any,
    action: any) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload }
        case 'logout':
            return { ...state, user: null }
        case 'authIsReady':
            return { ...state, user: action.payload, isAuthReady: true }
        default:
            return state
    }
}

const AuthContextProvider = ({ children }:any) => {

    const [state, dispatch]:any = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({ type: 'authIsReady', payload: user })
        });
        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };