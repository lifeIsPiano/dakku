//아무것도 없을 때
import '../assets/css/nolist.scss'

const NoList = ():JSX.Element => {
    return (
        <div className="no-content">
            <div className="contents">
                <img src="/image/error.png" alt="" />
                <p>
                    <span>이런!</span> <br/> 
                    아직 내용이 없어요.
                </p>
            </div>
        </div>
    )
}

export default NoList;