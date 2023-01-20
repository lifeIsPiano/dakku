//제출 버튼

const SubmitButton = ({btnName}:any) => {
    return (
        <div className="login-btn-wrapper">
            <input type="submit" value={btnName} className="sign-btn" disabled={false} />
        </div>
    )
}

export default SubmitButton;