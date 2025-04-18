import "./SetProfilePopup.css";
import "../../../assets/profile-white.png";

import { addData } from "../../../services/PostServices";
import {useState} from "react";

function SetProfilePopup({user, finish}) {
    const [currentFile, setFile] = useState(null);
    const [currentContent, setContent] = useState(null);
    const [next, setNext] = useState(false);
    function updateFile(event) {
        setFile(event.target.files[0]);
    }

    function updateContent(event) {
        setContent(event.target.value);
    }

    const [profile , setProfile] = useState({
        username : user,
        name : "",
        imageFilepath: "",
        description: ""
    });

    function setupProfile() {
            post.author = user;
            addData("http://localhost:8000/post", post)
                .then(
                    uploadImage(file)
                ).then(
                    fetchPosts()
                ).then(
                    setCreatePost(null)
                )
        }
    function updateFile(event) {
        setFile(event.target.files[0]);
    }

    function updateContent(event) {
        setContent(event.target.value);
    }

    function initPost() {
        return {
            username : "",
            name : "",
            imageFilepath: "",
            description: ""
        }
    }
    return (
        <div className="transparent-background">
            {next ? 
                <div className="create-post-popup">
                    <div className="setup-settings">
                        <label>Private</label>
                        <input name="account-privacy" type="radio" value="Private"></input>
                        <label>Public</label>
                        <input name="account-privacy" type="radio" value="Public"></input>
                    </div>
                    <button className="profile-button right" onClick={() => setNext(false)}>Back</button>
                    <button className="profile-button right" onClick={finish}>Finish</button>
                </div>
                :
                <div className="create-post-popup">
                    <div className="profile-image-input-wrapper">
                        <div className="circle-wrapper"> 
                        <img src="src/assets/profile-white.png"></img>
                            {currentFile ?
                                <img className="opened-post-image circle" src={URL.createObjectURL(currentFile)}></img> 
                                : <img className="circle" src="src/assets/profile-black.png"></img>}  
                        </div> 
                        <div className="profile-file-input-wrapper">
                            <div className="profile-input select-image right">Select Image
                                <input onChange={updateFile} type="file" hidden accept=".jpg, .jpeg, .png"></input>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input-wrapper">
                        <input className="profile-input" placeholder="Name"></input>
                        <textarea className="profile-input profile-description-input" placeholder="Description" onChange={updateContent}></textarea>
                    </div>
                    <button className="profile-button right" onClick={() => setNext(true)}>Next</button>
                </div>                
            } 
            
        </div>
    )
}

export default SetProfilePopup;