import { useReducer } from "react"
import { appFireStore, timeStamp } from "../store/fBase"
import { addDoc, deleteDoc, doc, collection } from "firebase/firestore"

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'deleteDoc':
            return { isPending: false, document: null, success: true, error: null }
        default:
            return state
    }
}

export const useFirestore = (transaction:any) => {
    const [response, dispatch] = useReducer(storeReducer, initState);
    const colRef = collection(appFireStore, transaction);

    const addDocument = async (doc:any) => {
        dispatch({ type: "isPending" });
        try {
            const createdTime = timeStamp.fromDate(new Date());
            const docRef = await addDoc(colRef, { ...doc, createdTime });
            dispatch({ type: 'addDoc', payload: docRef });
        } catch (e:any) {
            dispatch({ type: 'error', payload: e.message });
        }
    }

    const deleteDocument = async (id:any) => {
        dispatch({ type: "isPending" });
        try {
            const docRef = await deleteDoc(doc(colRef, id));
            dispatch({ type: 'deleteDoc', payload: docRef });
        } catch (e:any) {
            dispatch({ type: 'error', payload: e.message });
        }
    }

    return { addDocument, deleteDocument, response }

}