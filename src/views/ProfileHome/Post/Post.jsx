import "./Post.css";
import {useEffect, useState} from "react";

import { useNavigate } from "react-router";
import { getImageUrl } from "../../../services/PostServices";

function Post({post}) {
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
        <div onClick={() => navigate("/"+post.creator+"/"+post._id)} className="unclicked-post">
            <div className="image-wrapper">
                <img className="unclicked-post-image" src = {imageUrl}></img>
            </div>
        </div>
    );

   /* //const [isClicked, setClickStatus] = useState(false);
    //if(isClicked == false) {
    //} else {
        return (
            <div onClick={() => onClick(post)} className="clicked-post">
                <div className="image-wrapper">
                    <img className="clicked-post-image" src = {post.imageUrl}></img>
                    <div className="comment-section">
                        Comments
                    </div>
                </div>
            </div>
        )
    }*/
}
export default Post;