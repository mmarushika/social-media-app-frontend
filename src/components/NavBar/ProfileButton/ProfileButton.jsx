import "./ProfileButton.css";

function ProfileButton({name, onClick}) {
    return (
        <button className="profile-button" onClick={onClick}>{name}</button>
    )
}
export default ProfileButton;