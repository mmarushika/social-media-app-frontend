import "./EditProfilePopup.css";

import { useState } from "react";

function EditProfilePopup({ profileImageUrl, editProfile, close }) {
    const [currentImageUrl, setImageUrl] = useState(profileImageUrl);
    const [currentContent, setContent] = useState(null);

    function updateImageUrl(event) {
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <div className="transparent-background" onClick={close}>
            <div className="edit-profile-popup">
                <div>
                    <label>Private</label>
                    <input name="account-privacy" type="radio" value="Private"></input>
                    <label>Public</label>
                    <input name="account-privacy" type="radio" value="Public"></input>
                    <input className="select-image" onChange={updateImageUrl} type="file" accept=".jpg, .jpeg, .png"></input>
                </div>
                <div className="profile-image-wrapper">
                    <img className="opened-post-image" src={currentImageUrl}></img>
                </div>
            </div>
        </div>
    )
}
export default EditProfilePopup;