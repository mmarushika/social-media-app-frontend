import "./SetProfilePopup.css";
import profilePlaceholder from "../../../assets/profile-white.png";
import{Link} from "react-router";
import { addData, uploadProfileImage } from "../../../services/PostServices";
import {useState} from "react";

function SetProfilePopup({user, setUpdate}) {
    const [currentFile, setFile] = useState(null);
    const [currentName, setName] = useState(null);
    const [currentDescription, setDescription] = useState(null);
    const [currentPrivacy, setPrivacy] = useState(null);
    const [next, setNext] = useState(false);

    function finish() {
        const profile = {
            username : user,
            name : currentName,
            imageFilepath: `${currentFile ? currentFile.name : ""}`,
            description: currentDescription
        }
        
        const settings = {
            username : user,
            accountPrivacy: currentPrivacy
        }
        addData("http://localhost:8000/profile/new", {profile:profile, settings:settings})
        if(currentFile != null) uploadProfileImage(currentFile);
        setUpdate(x => x + 1);
    }

    return (
        <div className="transparent-background">
            {next ? 
                <div className="settings-popup">
                    <div className="setup-settings">
                        <label className="settings-header">Account Privacy</label>
                        <div className="privacy-settings">
                            <span className="privacy-input">
                                <label className="radio-input">Private</label>
                                <input name="account-privacy" type="radio" value="Private"
                                    onChange={(e) => setPrivacy(e.target.value)}></input>
                            </span>
                            <span className="privacy-input">
                                <label>Public</label>
                                <input name="account-privacy" type="radio" value="Public"
                                    onChange={(e) => setPrivacy(e.target.value)}></input>
                            </span>
                        </div>
                    </div>
                    <div className="right">
                        <button className="profile-button" onClick={() => setNext(false)}>Back</button>
                        <Link to={"/" + user}><button className="profile-button" onClick={finish}>Finish</button></Link>
                    </div>
                </div>
                :
                <div className="edit-profile-popup">
                    <div className="profile-image-input-wrapper">
                        <div className="circle-wrapper"> 
                            {currentFile ?
                                <img className="opened-post-image circle" src={URL.createObjectURL(currentFile)}></img> 
                                : <img className="circle" src={profilePlaceholder}></img>}  
                        </div>   
                        <div className="profile-file-input-wrapper">
                            <label className="select-image right">Select Image
                                <input type="file" hidden accept=".jpg, .jpeg, .png"
                                    onChange={(e) => setFile(e.target.files[0])}></input>
                            </label>
                        </div>
                    </div>
                    <div className="profile-input-wrapper">
                        <input className="profile-input" placeholder="Name"
                            onChange={(e) => setName(e.target.value)}></input>
                        <textarea className="profile-input profile-description-input" placeholder="Description" 
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button className="profile-button right" onClick={() => setNext(true)}>Next</button>
                </div>                
            } 
            
        </div>
    )
}

export default SetProfilePopup;