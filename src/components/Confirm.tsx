//모달(정보확인)
import '../assets/css/modal.scss';

const Confirm = ({click}:any):JSX.Element => {
    return (
        <div className="modal">
            <div className="msg box">
                <p>
                비밀번호는 공백 없이 6 ~ 16자 이내의 영문, 숫자, 특수문자(@,$,!,%,*,#,?,&,~)를 혼용해서 작성해주세요.
                </p>
                <button className='btn-modal' onClick={click}>확인</button>
            </div>
        </div>
    );
}

export default Confirm;