import "./CreatePostPopup.css";

import {useState} from "react";

function CreatePostPopup({closeHandler, makePost}) {
    //const [post, setPost] = useState({author:"", likes: 0, comments: [], content:"", imageFilepath:""});
    const [currentFile, setFile] = useState(null);
    const [currentContent, setContent] = useState(null);
    function updateFile(event) {
        setFile(event.target.files[0]);
    }

    function updateContent(event) {
        setContent(event.target.value);
    }

    function initPost() {
        return {
            author : "",
            content : currentContent,
            comments : 0,
            likes : 0,
            imageFilepath: currentFile.name,
        }
    }
    return (
        <div className="transparent-background" onClick={closeHandler}>
            <div className="create-post-popup">
                <input className="select-image" onChange={updateFile} type="file" accept=".jpg, .jpeg, .png"></input>
                <div className="image-wrapper">
                    {currentFile ?
                        <img className="opened-post-image" src={URL.createObjectURL(currentFile)}></img> 
                        : <></>}   
                </div>
                <div className="post-content-wrapper">
                    <textarea className="post-content" placeholder="Add a message" onChange={updateContent}></textarea>
                </div>
                <button className="post-button" onClick={() => {makePost(initPost(), currentFile)}}>Post</button>
            </div>
        </div>
    );
}

export default CreatePostPopup;