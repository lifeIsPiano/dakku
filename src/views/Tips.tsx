//다꾸 팁
import Write from "../components/Write";
import { useAuthContext } from '../hooks/useAuthContext';

const Tips = ():JSX.Element => {
    const { user } = useAuthContext();

    return (
        <div className="view">
            {user && <Write />}
        </div>
    );
}

export default Tips;