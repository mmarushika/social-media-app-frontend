import { uploadPostImage, addData } from "../../../services/PostServices";
import imagePlaceholder from "../../../assets/image-placeholder.png";
import "./CreatePostPopup.css";

import { useNavigate, Link } from "react-router";
import { useState } from "react";

function CreatePostPopup({ user, setUpdate }) {
    const navigate = useNavigate();
    const [currentFile, setFile] = useState(null);
    const [currentContent, setContent] = useState(null);

    function makePost(e) {
        const post = {
            creator: user,
            content: currentContent,
            comments: 0,
            likes: 0,
            imageFilepath: currentFile.name,
            timestamp : JSON.stringify(new Date)
        }
        addData("http://localhost:8000/post", post)
            .then(
                uploadPostImage(currentFile)
            )
        setUpdate(x => x + 1);
    }

    function close(e) {
        if (e.target.className == "transparent-background") {
            navigate("/" + user);
        }
    }
    return (
        <div className="transparent-background" onClick={close}>
            <div className="create-post-popup">
                <div className="post-image-input-wrapper">
                    {currentFile ?
                        <img className="post-input-image" src={URL.createObjectURL(currentFile)}></img>
                        : <img className="post-input-image" src={imagePlaceholder}></img>}
                    <div className="post-file-input-wrapper">
                        <label className="select-image right">Select Image
                            <input type="file" hidden accept=".jpg, .jpeg, .png"
                                onChange={(e) => setFile(e.target.files[0])}></input>
                        </label>
                    </div>
                </div>
                <div className="post-input-wrapper">
                    <textarea className="post-input post-message-input" placeholder="Add a message"
                        onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <Link to={"/" + user}><button className="profile-button right" onClick={makePost}>Post</button></Link>
            </div>
        </div>
    );
}


export default CreatePostPopup;

/*

<label className="select-image right">Select Image
                                <input type="file" hidden accept=".jpg, .jpeg, .png"
                                    onChange={(e) => setFile(e.target.files[0])}></input>
                            </label>
                <div className="opened-post-image-wrapper">
                    {currentFile ?
                        <img className="opened-post-image" src={URL.createObjectURL(currentFile)}></img> 
                        : <></>}   
                </div>
                <div className="post-content-wrapper">
                    <textarea className="post-content" placeholder="Add a message" onChange={updateContent}></textarea>
                </div>
                <Link to="/user"><button className="profile-button" onClick={makePost}>Post</button></Link>
            </div>
        */