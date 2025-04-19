import "./ProfileHome.css";

import { useLocation } from "react-router";
import {getData, addData, updateData} from "../../services/PostServices";
import {useState, useEffect} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";
import SetProfilePopup from "./SetProfilePopup/SetProfilePopup";
import Profile from "./Profile/Profile";

function ProfileHome({user, viewer, createPost, setProfile}) {
    const [posts, setPosts] = useState([]);
    const [clickedPost, setClickedPost] = useState(null);
    const [update, setUpdate] = useState(0);
    const [profileSettings, setProfileSettings] = useState({accountPrivacy: ""});
    // forces update on data update
    // https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
    const location = useLocation();
    // force update on url change 
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component

    useEffect(() => {
        async function fetchPosts() {
            const data = await getData(`http://localhost:8000/posts?username=${user}`)
            setPosts([...data.reverse()]);
        }
        async function fetchSettings() {
            const data = await getData(`http://localhost:8000/posts?username=${user}`)
            setProfileSettings([...data]);
        }
        fetchPosts();
    }, [update, location.pathname]);
    
    // Set follow status
    const [followStatus, setFollowStatus] = useState("Follow");

    function fetchFollowStatus() {
        getData(`http://localhost:8000/follow/status?user=${user}&viewer=${viewer}`)
            .then(data => setFollowStatus(data.status))
            .then(console.log(followStatus));
    }

    if(user !== viewer) {
        useEffect(fetchFollowStatus, [location.pathname]);
    }
    
    // Follow Handlers
    function requestFollow() {
        const request = {account : user, requester: viewer}
        addData(`http://localhost:8000/follow/request`, request)
            .then(fetchFollowStatus());
    }
    function cancelRequest() {
        const request = {account : user, requester: viewer}
        updateData(`http://localhost:8000/follow/request/cancel`, request)
            .then(fetchFollowStatus());
    }
    function cancelFollow() {
        const follow = {account : user, follower: viewer}
        updateData(`http://localhost:8000/follow/cancel`, follow)
            .then(fetchFollowStatus());
    }
    function getFollowHandler() {
        if(followStatus == "Follow") {
            return requestFollow;
        } else if(followStatus == "Requested") {
            return cancelRequest;
        } else if(followStatus == "Unfollow") {
            return cancelFollow;
        } 
    }

    function clickBackground(event) {
        if(event.target.className == "transparent-background") {
            setClickedPost(false);
        }
    }

    function clickPost(post) {
        if(clickedPost === null) {
            setClickedPost(post);
        } else {
            setClickedPost(null);
        }
    }

    return (
        <div className="view profile-home">
            {setProfile ? 
                <SetProfilePopup user={user} setUpdate={setUpdate}/> 
                : 
                <>
                    <Profile user={user} viewer={viewer} followStatus={followStatus} followHandler={getFollowHandler()}/>
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


