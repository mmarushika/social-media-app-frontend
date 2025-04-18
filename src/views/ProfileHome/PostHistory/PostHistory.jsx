import "./PostHistory.css";
import Post from "../Post/Post";

import {useEffect, useState} from "react";
import { getImageUrl } from "../../../services/PostServices";
function PostHistory({posts, handlePostClick}) {
    const [imageUrl, setImageUrl] = useState(null);
    function fetchImageUrl() {

            getImageUrl('/Users/marushikamanohar/Programming/Fullstack/social-media-app/social-media-app-backend/services/assets/posts/IMG_3116.jpeg')
                .then(url => setImageUrl(url));
                console.log("hello");
        }
    useEffect(fetchImageUrl);
    return (
        <div className="post-history">
            <img src={imageUrl} alt="Fetched image" />
            {posts.map(i => <Post post={i} onClick={handlePostClick} />)}
        </div>
    )
}

export default PostHistory;