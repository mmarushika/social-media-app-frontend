import "./ProfileHome.css";

import { useLocation } from "react-router";
import {getData, addData, updateData} from "../../services/PostServices";
import {useState, useEffect} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";
import SetProfilePopup from "./SetProfilePopup/SetProfilePopup";
import Profile from "./Profile/Profile";
import PrivateAccount from "./PrivateAccount/PrivateAccount";
import FollowPopup from "./FollowPopup/FollowPopup";

function ProfileHome({user, viewer, createPost, setProfile, viewFollowers, viewFollowing}) {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [clickedPost, setClickedPost] = useState(null);
    const [update, setUpdate] = useState(0);
    const [profileSettings, setProfileSettings] = useState({accountPrivacy: ""});
    const [profileStats, setProfileStats] = useState({posts: 0, following: 0, followers: 0});

    // forces update on data update
    // https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
    const location = useLocation();
    // force update on url change 
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component

    useEffect(() => {
        setProfileStats({posts: posts.length, following: following.length, followers: followers.length})
    }, [posts, followers, following, update, location.pathname]);
    useEffect(() => {
        async function fetchPosts() {
            const data = await getData(`http://localhost:8000/posts?username=${user}`)
            setPosts([...data.reverse()]);
        }
        async function fetchSettings() {
            const data = await getData(`http://localhost:8000/profile/settings?username=${user}`)
            setProfileSettings(data);
        }
        async function fetchFollowers() {
            const data = await getData(`http://localhost:8000/followers?username=${user}`);
            console.log(data);
            setFollowers([...data]);
        }
        async function fetchFollowing() {
            const data = await getData(`http://localhost:8000/following?username=${user}`);
            console.log(data);
            setFollowing([...data]);
        }
        fetchSettings();
        fetchPosts()
        fetchFollowers()
        fetchFollowing()
    }, [update, location.pathname]);
    
    // Set follow status
    const [followStatus, setFollowStatus] = useState("Follow");

    function fetchFollowStatus() {
        getData(`http://localhost:8000/follow/status?user=${user}&viewer=${viewer}`)
            .then(data => setFollowStatus(data.status))
            .then(console.log(followStatus));
    }
    // https://stackoverflow.com/questions/53472795/uncaught-error-rendered-fewer-hooks-than-expected-this-may-be-caused-by-an-acc
    useEffect(fetchFollowStatus, [update, location.pathname]);

    // Follow Handlers
    function requestFollow() {
        const request = {account : user, requester: viewer}
        addData(`http://localhost:8000/follow/request`, request)
        setUpdate(x => x + 1);
    }
    function cancelRequest() {
        const request = {account : user, requester: viewer}
        updateData(`http://localhost:8000/follow/request/cancel`, request)
        setUpdate(x => x + 1);
    }
    function cancelFollow() {
        const follow = {account : user, follower: viewer}
        updateData(`http://localhost:8000/follow/cancel`, follow)
        setUpdate(x => x + 1);
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
    function isFollower() {
        return followers.find((i) => (i == viewer)) != undefined;
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
    //console.log(profileSettings, user, viewer);
    return (
        <div className="view profile-home">
            {setProfile ? 
                <SetProfilePopup user={user} setUpdate={setUpdate}/> 
                : 
                <>
                    <Profile user={user} viewer={viewer} followStatus={followStatus} 
                        followHandler={getFollowHandler()} profileStats={profileStats}/>
                    {(profileSettings.accountPrivacy != "Private" || user == viewer || isFollower()) ?
                        <PostHistory posts={posts} clickPost={clickPost}/>
                    : <PrivateAccount/>}
                </>

            }
            {createPost ? 
                <CreatePostPopup user ={user} setUpdate={setUpdate}/> : <></>
            }  
            {clickedPost ? <OpenedPost post={clickedPost} onClick={clickBackground}/> : <></> }
            {viewFollowers ?
                <FollowPopup user={user} mode="Followers" list={followers}/> : <></>
            }
            {viewFollowing ?
                <FollowPopup user={user} mode="Following" list={following}/> : <></>
            }
        </div>
    );
}
export default ProfileHome;


