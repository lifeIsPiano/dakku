import { useContext } from 'react' 
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context:any = useContext(AuthContext);
    return context
}