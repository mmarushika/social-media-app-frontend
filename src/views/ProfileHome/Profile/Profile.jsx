import "./Profile.css";
import { useState, useEffect } from "react";
import { getImageUrl } from "../../../services/PostServices";

function Profile({ user }) {
    const [imageUrl, setImageUrl] = useState(null);
    function fetchImageUrl() {
        getImageUrl(user.imageFilepath).then(url => {
            console.log(url);
            setImageUrl(url)
        });
    }
    useEffect(fetchImageUrl, []);
    return (
        <div className="profile">
            <div className="profile-photo-wrapper">
                {imageUrl !== "" ?
                    <img className="profile-photo" src={imageUrl}></img> :
                    <img className="profile-photo" src="src/assets/profile-white.png"></img>
                }
            </div>
            <div className="profile-info-wrapper">
                <h1>{user.username}</h1>
                <h2>{user.name}</h2>
                <h3>{user.description}</h3>
            </div>
        </div>
    )
}
export default Profile;