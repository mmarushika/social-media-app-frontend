import "./Profile.css";
import profilePlaceholder from "../../../assets/profile-white.png";
import settings from "../../../assets/white-settings.png";
import { useState, useEffect } from "react";
import { getImageUrl, getData, updateData }  from "../../../services/PostServices";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.jsx";

function Profile({ user, viewer }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [profileStats, setProfileStats] = useState({
        posts: 20,
        following: [1, 2, 3],
        followers: [1, 2, 3]
    });
    const [profile, setProfile] = useState({
        
    });
    const [profileEdit, setProfileEdit] = useState(false);

    // Declare effects
    //seEffect(fetchImageUrl, []);
    useEffect(fetchProfile, []);

    // Declar fetch functions
    function fetchImageUrl() {
        getImageUrl(user.imageFilepath).then(url => {
            console.log(url);
            setImageUrl(url)
        });
    }
    
    function fetchProfile() {
        getData(`http://localhost:8000/profile?username=${user}`)
            .then(profile => setProfile(profile));
    }

    function editProfile() {
        setProfileEdit(true);
    }

    function close() {
        if(event.target.className == "transparent-background") {
            setProfileEdit(false);
        } else {
            updateData(`http://localhost:8000/profile?username=${user}`)
                .then(fetchProfile());
        }
    }
    function follow() {
        updateData(`http://localhost:8000/followusername=${user}`)
            .then(fetchProfile());
    }

    return (
        <div className="profile">
            {profileEdit ? 
                <EditProfilePopup currentImageUrl={imageUrl} editProfile={editProfile} close={close}/> : <></>}
            <div className="profile-photo-wrapper">
                {imageUrl ?
                    <img className="profile-photo" src={imageUrl}></img> :
                    <img className="profile-photo" src={profilePlaceholder}></img>
                }
            </div>
            <div className="profile-info">
                <div className="profile-header">
                    <div className="profile-username">{profile.username}</div>
                    {user === viewer ?
                        <div className="account-owner-buttons">
                            <button className="profile-button" onClick={editProfile}>Edit Profile</button> 
                            <div className="settings-button-wrapper">
                                <img className="settings-button" src={settings}></img>
                            </div>
                        </div>
                        : <button className="profile-button" onClick={follow}>Follow</button> }
                </div>
                <div className="profile-stats">
                    <span className="profile-stats-field">Posts <b className="white"> {profileStats.posts}</b></span>
                    <span className="profile-stats-field">Followers <b className="white"> {profileStats.followers.length}</b></span>
                    <span className="profile-stats-field">Following <b className="white"> {profileStats.following.length}</b></span>
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
