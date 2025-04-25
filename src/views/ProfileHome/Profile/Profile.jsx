import "./Profile.css";
import profilePlaceholder from "../../../assets/profile-white.png";
import settings from "../../../assets/white-settings.png";
import refresh from "../../../assets/refresh.png";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getImageUrl, getData, updateData, addData } from "../../../services/PostServices";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.jsx";

function Profile({ user, viewer, profileStats, followStatus, followHandler, setUpdate, mutualFollower}) {
    console.log(user, viewer);
    console.log(profileStats);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [profile, setProfile] = useState({
        username: user,
        imageFilepath: "",
        name: "",
        description: ""
    });
    const [profileEdit, setProfileEdit] = useState(false);
    // force update on url change 
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const location = useLocation();

    // Declare effects
    /*useEffect(() => {
        async function fetchProfileStats() {
            getData(`http://localhost:8000/profile/stats?username=${user}`)
            .then(data => setProfileStats(data))
        }
    })*/
    useEffect(() => {
        function fetchProfile() {
            console.log(user);
            getData(`http://localhost:8000/profile?username=${user}`)
                .then(data => setProfile(data))
        }
        fetchProfile();
    }, [location.pathname]);
    useEffect(() => {
        function fetchImageUrl(filepath) {
            getImageUrl(filepath).then(url => {
                setImageUrl(url);
            });
        }
        if (profile.imageFilepath != "") {
            fetchImageUrl(profile.imageFilepath);
        }
    }, [profile, location.pathname]);

    function editProfile() {
        setProfileEdit(true);
    }
    function close(e) {
        if (e.target.className == "transparent-background") {
            setProfileEdit(false);
        }
    }
    return (
        <div className="profile">
            {profileEdit ?
                <EditProfilePopup currentImageUrl={imageUrl} editProfile={editProfile} close={close} /> : <></>}
            <div className="profile-photo-wrapper">
                {imageUrl ?
                    <img className="profile-photo" src={imageUrl}></img> :
                    <img className="profile-photo" src={profilePlaceholder}></img>
                }
            </div>
            <div className="profile-info">
                <div className="profile-header">
                    <div className="profile-username">{user}</div>
                    {viewer == user ?
                        <div className="account-owner-buttons">
                            <button className="profile-button" onClick={editProfile}>Edit Profile</button>
                            <div className="settings-button-wrapper">
                                <img className="settings-button" src={settings}></img>
                            </div>
                        </div>
                        :
                        <>
                            <button className="profile-button" onClick={followHandler}><b>{followStatus}</b></button>
                            {mutualFollower ? 
                            <button className="profile-button" onClick={() => navigate("/inbox/"+user)}>Message</button> : <></>
                        }
                        </>
                    }
                </div>
                <div className="profile-stats">
                    <span className="profile-stats-field">Posts <b className="white"> {profileStats.posts}</b></span>
                    <span className="profile-stats-field" onClick={() => navigate("/" + user + "/followers")}>
                        Followers <b className="white" > {profileStats.followers}</b></span>
                    <span className="profile-stats-field" onClick={() => navigate("/" + user + "/following")}>
                        Following <b className="white"> {profileStats.following}</b></span>
                </div>
                <b>{profile.name}</b>
                <div className="profile-content">
                    <div>{profile.description}</div>
                </div>
            </div>
            
        </div>
    )
}
export default Profile;

/*

<div className="refresh-wrapper" onClick={() => setUpdate(x => x + 1)}>
    <img className="refresh-image" src={refresh}></img>
</div>

 */