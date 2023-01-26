//제출 버튼

const SubmitButton = ({btnName, able}:any) => {
    return (
        <div className="login-btn-wrapper">
            <input type="submit" value={btnName} className="sign-btn" disabled={able} />
        </div>
    )
}

export default SubmitButton;