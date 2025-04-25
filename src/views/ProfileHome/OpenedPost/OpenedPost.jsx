import "./OpenedPost.css";

import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getImageUrl } from "../../../services/PostServices";

function OpenedPost({ post, close }) {
    console.log(post);
    const [imageUrl, setImageUrl] = useState(null);
    function fetchImageUrl() {
        getImageUrl(post.imageFilepath).then(url => {
            console.log(url);
            setImageUrl(url)
        });
    }
    useEffect(fetchImageUrl, []);

    return (
        <div className="transparent-background" onClick={close}>
            <div className="opened-post">
                <div className="opened-post-image-wrapper">
                    <img className="opened-post-image" src={imageUrl}></img>
                </div>
                <div className="comment-section">
                    {post.content}<br></br>
                    <label className="bold-heading">Comments</label>
                </div>
            </div>
        </div>
    );
}
export default OpenedPost;