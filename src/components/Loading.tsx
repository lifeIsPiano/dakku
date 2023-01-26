//로그인 로딩
import '../assets/css/loading.scss';

const Loading = ():JSX.Element => {
    return (
        <div className="loading-wrapper">
            <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}

export default Loading;