import "./LoginField.css"

function LoginField({ onClick }) {
    return (
        <div className="login-field">
            <div className="login-field-wrapper">
                <label className="username-field">
                    Username <input name="username" type="text"></input>
                </label><br></br>
                <label className="password-field">
                    Password <input name="username" type="text"></input>
                </label><br></br>
                <button className="login-button" onClick={onClick}>Submit</button>
            </div>
        </div>
    );
}
export default LoginField;