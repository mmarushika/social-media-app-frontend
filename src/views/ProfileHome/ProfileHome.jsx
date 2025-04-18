import "./ProfileHome.css";

import {useNavigate} from "react-router";
import {getData} from "../../services/PostServices";
import {useState, useEffect, useRef} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";
import SetProfilePopup from "./SetProfilePopup/SetProfilePopup";
import Profile from "./Profile/Profile";

function ProfileHome({createPost, setProfile, user}) {
    console.log(user, setProfile)
    const [posts, setPosts] = useState([]);
    //const [currentPost, setPost] = useState({likes: 0, comments: [], content:"", imageUrl:""});
    const [clickedPost, setClickedPost] = useState(null);

    function fetchPosts() {
        console.log(user);
        getData(`http://localhost:8000/posts?username=${user}`)
            .then((data) => setPosts(data));
    }

    useEffect(fetchPosts, []);
    

    function handlePostClick(post) {
        if(clickedPost === null) {
            setClickedPost(post);
        } else {
            setClickedPost(null);
        }
    }

    function handleBackgroundClick(event) {
        if(event.target.className == "transparent-background") {
            //setClickedPost(null);
            //setCreatePost(null);
        }
    }


    function getClickedPost() {
        if(clickedPost !== null) {
            return (
                /*<div className="transparent-background" onClick={handleBackgroundClick}>
                    <OpenedPost post={clickedPost}/>
                </div>*/
                <OpenedPost post={clickedPost} onClick={handleBackgroundClick}/>
            )
        }
    }

    const profile = {
        "username": user,
        "name": "Alice Adams",
        "imageFilepath": "",
        "description": `I am a tes. I am a test. I am a test.I am a test.I am a 
        test.I am test am a tes. I am a test. I am a test.I am a test.I am a test.I am test`
    } 
    return (
        <div className="view profile-home">
            <button onClick={fetchPosts}>Get Posts</button>
            {setProfile ? 
                <SetProfilePopup user={user}/> : <></>
            }
            {createPost ? 
                <CreatePostPopup user ={user} /> : <></>
            }  
            <Profile user={profile} viewer={"balice123"}/>
            <PostHistory posts={posts} handlePostClick={handlePostClick}/>
            { getClickedPost() }
        </div>
    );
}
export default ProfileHome;


/*const fileRef = useRef(null);
function test() {
    console.log(fileRef.current?.files[0]?.name);
    const file = fileRef.current?.files[0];
    uploadImage(file);
}
   const profile = {
        "username": "alice123",
        "name": "Alice Adams",
        "imageFilepath": "/Users/marushikamanohar/Programming/Fullstack/social-media-app/social-media-app-backend/images/posts/IMG_5003.jpeg",
        "description": `I am a test
            I am a test
            I am a test
            I am a test
            I am a test
            I am test`
    } 
*/

/*

    const [imageURL, setImageURL] = useState(null);

    function fetchImageUrl() {
        getImageUrl().then(url => setImageURL(url));
    }

    useEffect(fetchImageUrl, []);

<input ref={fileRef} type="file" accept="jpeg, png, jpg"></input>
<img width="100"src= {imageURL}></img>
<button onClick={test}>Test</button>*/