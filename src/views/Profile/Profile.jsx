import "./Profile.css";

import {getData, addData, uploadImage, getImageUrl} from "../../services/PostServices";
import {useState, useEffect, useRef} from "react";
import PostHistory from "./PostHistory/PostHistory";
import OpenedPost from "./OpenedPost/OpenedPost";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";

function Profile({user}) {
    const [posts, setPosts] = useState([]);
    //const [currentPost, setPost] = useState({likes: 0, comments: [], content:"", imageUrl:""});
    const [clickedPost, setClickedPost] = useState(null);
    const [createPost, setCreatePost] = useState(null);

    function fetchPosts() {
        console.log(posts);
        getData("http://localhost:8000/posts")
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
            setClickedPost(null);
            setCreatePost(null);
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

    function makePost(post, file) {
        post.author = user;
        addData("http://localhost:8000/post", post)
            .then(
                uploadImage(file)
            ).then(
                fetchPosts()
            ).then(
                setCreatePost(null)
            )
    }

    const fileRef = useRef(null);
    function test() {
        console.log(fileRef.current?.files[0]?.name);
        const file = fileRef.current?.files[0];
        //uploadImage(file);
    }

    return (
        <div className="view profile-home">
            <button onClick={() => setCreatePost(prev => !prev)}>Create Post</button>
            {createPost ? 
                <CreatePostPopup user ={user} closeHandler={handleBackgroundClick} makePost={makePost} />
                : <></>
            }  
            <PostHistory posts={posts} handlePostClick={handlePostClick}/>
            { getClickedPost() }
        </div>
    );
}
export default Profile;

/*

    const [imageURL, setImageURL] = useState(null);

    function fetchImageUrl() {
        getImageUrl().then(url => setImageURL(url));
    }

    useEffect(fetchImageUrl, []);

<input ref={fileRef} type="file" accept="jpeg, png, jpg"></input>
<img width="100"src= {imageURL}></img>
<button onClick={test}>Test</button>*/