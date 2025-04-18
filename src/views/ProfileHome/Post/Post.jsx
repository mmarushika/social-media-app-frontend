import "./Post.css";
import {useEffect, useState} from "react";

import { getImageUrl } from "../../../services/PostServices";

function Post({post, onClick}) {
    const [imageUrl, setImageUrl] = useState(null);
    function fetchImageUrl() {
        console.log(post);
        const url = getImageUrl(post.imageFilepath);
        console.log(url);
        setImageUrl(url);
            /*.then(url => {
                console.log(url);
                setImageUrl(url)
            })
            .then(
                console.log(imageUrl)
            )*/
    }
    useEffect(fetchImageUrl);
    return (
        <div onClick={() => onClick(post)} className="unclicked-post">
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