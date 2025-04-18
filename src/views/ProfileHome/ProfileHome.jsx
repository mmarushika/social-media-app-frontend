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
    const [posts, setPosts] = useState([]);
    const [clickedPost, setClickedPost] = useState(null);
    const [refresh, setRefresh] = useState(false);

    function fetchPosts() {
        console.log(user);
        getData(`http://localhost:8000/posts?username=${user}`)
            .then((data) => setPosts(data));
    }

    useEffect(fetchPosts, [refresh]);
    
    function clickPost(post) {
        if(clickedPost === null) {
            setClickedPost(post);
        } else {
            setClickedPost(null);
        }
    }

    function clickBackground(event) {
        if(event.target.className == "transparent-background") {
            setClickedPost(false);
            console.log()
        }
    }

    return (
        <div className="view profile-home">
            {setProfile ? 
                <SetProfilePopup user={user} setRefresh={setRefresh}/> 
                : 
                <>
                    <Profile user={user} viewer={user}/>
                    <PostHistory posts={posts} clickPost={clickPost}/>
                </>

            }
            {createPost ? 
                <CreatePostPopup user ={user} setRefresh={setRefresh}/> : <></>
            }  
            {clickedPost ? <OpenedPost post={clickedPost} onClick={clickBackground}/> : <></> }
        </div>
    );
}
export default ProfileHome;


