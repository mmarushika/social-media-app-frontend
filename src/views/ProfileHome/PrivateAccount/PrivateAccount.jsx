import "./PrivateAccount.css";
import lock from "../../../assets/lock.png"

function PrivateAccount() {
    return(
        <div className="private-account">
            <div className="private-account-header">Private Account</div>
            <div className="lock-wrapper">
                <img className="contain-image"src={lock}></img>
            </div>
        </div>
    )
}

export default PrivateAccount;