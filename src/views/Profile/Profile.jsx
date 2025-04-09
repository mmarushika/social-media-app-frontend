import "./Profile.css";
import {useState} from "react";
import Post from "./Post/Post";

function Profile() {
    const [posts, setPosts] = useState([]);
    const [currentPost, setPost] = useState({content:"", imageUrl:""});

    function setImage(event) {
        let image = event.target.files[0];
        setPost({...currentPost, imageUrl: URL.createObjectURL(image)});
        console.log(currentPost);
    }
    function makePost() {
        setPosts(prevPosts => [...prevPosts, currentPost]);
        console.log(posts);
    }
    return (
        <div>
            <input onChange={setImage} type="file" accept=".jpg, .jpeg, .png"></input>
            <button onClick={makePost}>Post</button>
            <div className="post-history"> 
                { posts.map(i => <Post post={i}/>) }
            </div>
        </div>
    )
}
export default Profile;