import { useContext } from 'react' 
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext<any>(AuthContext);
    return context
}