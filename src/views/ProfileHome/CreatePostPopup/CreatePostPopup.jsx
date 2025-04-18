import { uploadPostImage, addData } from "../../../services/PostServices";
import "./CreatePostPopup.css";

import {Link, useNavigate} from "react-router";
import {useState} from "react";

function CreatePostPopup({user}) {
    const navigate = useNavigate();
    const [currentFile, setFile] = useState(null);
    const [currentContent, setContent] = useState(null);
    function updateFile(event) {
        setFile(event.target.files[0]);
    }

    function updateContent(event) {
        setContent(event.target.value);
    }

    function makePost() {
        const post = {
            creator : user,
            content : currentContent,
            comments : 0,
            likes : 0,
            imageFilepath: currentFile.name,
        }
        addData("http://localhost:8000/post", post)
            .then(
                uploadPostImage(currentFile)
            )
    }
    
    function close(e) {
        if(e.target.className == "transparent-background") {
            navigate("/user");
        }
    }
    return (
        <div className="transparent-background" onClick={close}>
            <div className="create-post-popup">
                <input className="select-image" onChange={updateFile} type="file" accept=".jpg, .jpeg, .png"></input>
                <div className="opened-post-image-wrapper">
                    {currentFile ?
                        <img className="opened-post-image" src={URL.createObjectURL(currentFile)}></img> 
                        : <></>}   
                </div>
                <div className="post-content-wrapper">
                    <textarea className="post-content" placeholder="Add a message" onChange={updateContent}></textarea>
                </div>
                <Link to="/user"><button className="post-button" onClick={makePost}>Post</button></Link>
            </div>
        </div>
    );
}

export default CreatePostPopup;