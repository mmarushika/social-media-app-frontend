import "./Auth.css";
import LoginField from "./LoginField/LoginField";

function Auth() {
    function handleSubmit() {

    }
    return (
        <div className="auth">
            <LoginField onClick={() => {console.log("submitted")}}/>
        </div>
    );
}
export default Auth;