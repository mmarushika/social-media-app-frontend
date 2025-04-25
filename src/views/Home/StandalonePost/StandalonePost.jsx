import "./StandalonePost.css";

import User from "../../../components/User/User";

import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getImageUrl } from "../../../services/PostServices";

function StandalonePost({post}) {
    console.log(post);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    function fetchImageUrl() {
        getImageUrl(post.imageFilepath).then(url => {
            console.log(url);
            setImageUrl(url)
        });
    }
    useEffect(fetchImageUrl, []);

    return (
        <div onClick={() => navigate("/home/"+post._id)} className="standalone-post">
            <User currentUser={post.creator} username={post.creator} mode="static" />
            <div className="image-wrapper">
                <img className="unclicked-post-image" src = {imageUrl}></img>
            </div>
        </div>
    );
}

export default StandalonePost;