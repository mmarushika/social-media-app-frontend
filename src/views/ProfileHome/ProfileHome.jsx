import "./ProfileHome.css";

import {useNavigate} from "react-router";
import {getData} from "../../services/PostServices";
import {useState, useEffect, useRef} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";
import SetProfilePopup from "./SetProfilePopup/SetProfilePopup";
import Profile from "./Profile/Profile";

function ProfileHome({user, viewer, createPost, setProfile}) {
    const [posts, setPosts] = useState([]);
    const [clickedPost, setClickedPost] = useState(null);
    const [update, setUpdate] = useState(0);
    console.log(viewer);
    // forces update
    // https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate

    useEffect(() => {
        async function fetchPosts() {
            const data = await getData(`http://localhost:8000/posts?username=${user}`)
            setPosts([...data.reverse()]);
        }
        fetchPosts();
    }, [update]);
    
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
        }
    }

    return (
        <div className="view profile-home">
            {setProfile ? 
                <SetProfilePopup user={user} setUpdate={setUpdate}/> 
                : 
                <>
                    <Profile user={user} viewer={viewer}/>
                    <PostHistory posts={posts} clickPost={clickPost}/>
                </>

            }
            {createPost ? 
                <CreatePostPopup user ={user} setUpdate={setUpdate}/> : <></>
            }  
            {clickedPost ? <OpenedPost post={clickedPost} onClick={clickBackground}/> : <></> }
        </div>
    );
}
export default ProfileHome;


