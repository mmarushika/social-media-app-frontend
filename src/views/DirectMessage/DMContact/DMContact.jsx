import "./DMContact.css";

import profilePlaceholder from "../../../assets/profile-white.png";
import { getData, getImageUrl } from "../../../services/PostServices";
import { useState, useEffect } from "react";

function DMContact({ mode, contact, onClick }) {
    const [imageUrl, setImageUrl] = useState("");
    const [profile, setProfile] = useState({ name: "", imageFilepath: "" });
    // Declare effects
    // Fetch and set profile to get profile image
    useEffect(() => {
        function fetchProfile() {
            getData(`http://localhost:8000/profile?username=${contact}`)
                .then(data => setProfile(data))
        }
        fetchProfile();
    }, [location.pathname]);
    // Fetch and set profile image
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
    return (
        <div className="dm-contact" onClick={() => onClick(contact)}>
            <div className="dm-contact-info-wrapper">
                <div className={"user-button-profile-wrapper"}>
                    {imageUrl ?
                        <img className="profile-photo" src={imageUrl}></img> :
                        <img className="profile-photo" src={profilePlaceholder}></img>
                    }
                </div>
                <div className={"user-button-info-wrapper"}>
                    <div className="white"><b>{contact}</b></div>
                    <div className="gray">{profile.name}</div>
                </div>
            </div>
            {mode == "add-contact" ?
                <button className="profile-button">Message</button> : <></>
            }
        </div>
    )
}
export default DMContact;