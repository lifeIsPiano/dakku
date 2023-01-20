//챌린지
import Write from "../components/Write";
import { useAuthContext } from '../hooks/useAuthContext';

const Challenge = ():JSX.Element => {
    const { user } = useAuthContext();
    
    return (
        <div className="view">
            {user && <Write />}
        </div>
    );
}

export default Challenge;