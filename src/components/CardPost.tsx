import CardDetail from "./CardDetail";
import '../assets/css/card.scss';

const CardPost = ():JSX.Element => {
    return (
        <div className="card">
            <div className="prof">
                <img src={`/image/userImage.png`} alt="" className="img-small"/>
                <div className="data">
                    <h5>Nickname</h5>
                    <p>{`2023.1.23 오후 2:23`}</p>
                </div>
            </div>
            <div className="post-content">
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit magni alias non mollitia beatae voluptas esse! Ea illum exercitationem, rerum, ipsam neque ipsa sed maxime magni cum est nostrum.
                </p>
                {/* <div className="image-list">
                    <img src="" alt="" />
                </div> */}
            </div>
            <div className="card-detail np">
                <CardDetail/>
            </div>
        </div>
    );
}

export default CardPost;