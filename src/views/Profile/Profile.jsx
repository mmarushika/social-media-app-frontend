import "./Profile.css";
import {useState} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";

function Profile() {
    const [posts, setPosts] = useState([]);
    const [currentPost, setPost] = useState({content:"", imageUrl:""});
    const [clickedPost, setClickedPost] = useState(null);

    function setImage(event) {
        let image = event.target.files[0];
        setPost({...currentPost, imageUrl: URL.createObjectURL(image)});
        console.log(currentPost);
    }
    function makePost() {
        setPosts(prevPosts => [...prevPosts, currentPost]);
        console.log(posts);
    }

    function handlePostClick(post) {
        if(clickedPost === null) {
            setClickedPost(post);
        } else {
            setClickedPost(null);
        }
    }

    function handleBackgroundClick(event) {
        if(event.target.className == "transparent-background") {
            setClickedPost(null);
        }
    }

    function getClickedPost() {
        if(clickedPost !== null) {
            return (
                <div className="transparent-background" onClick={handleBackgroundClick}>
                    <OpenedPost post={clickedPost}/>
                </div>
            )
        }
    }
    return (
        <div>
            <input onChange={setImage} type="file" accept=".jpg, .jpeg, .png"></input>
            <button onClick={makePost}>Post</button>
            <PostHistory posts={posts} handlePostClick={handlePostClick}/>
            { getClickedPost() }
        </div>
    );
}
export default Profile;