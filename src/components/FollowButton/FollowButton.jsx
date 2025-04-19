import "./FollowButton.css";

function FollowButton({name, request, cancelRequest, unfollow}) {
    if(name == "Follow") {
        return (
            <button className="profile-button" onClick={request}>{name}</button>
        )
    } else if(name == "Requested" ){
        return (
            <button className="profile-button" onClick={cancelRequest}></button>
        )
    } else if(name == "Unfollow") {
        return (
            <button className="profile-button" onClick={cancelRequest}></button>
        )
    }
}
export default ProfileButton;