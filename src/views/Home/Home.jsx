import "./Home.css";

import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { getData } from "../../services/PostServices";
import Explore from "./Explore/Explore";
import RequestManager from "./RequestManager/RequestManager";
import PostGallery from "./PostGallery/PostGallery";
import OpenedPost from "../ProfileHome/OpenedPost/OpenedPost";

function Home({ user, clickedPost }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const data = await getData(`http://localhost:8000/posts/all`)
            if (data != null) {
                setPosts([...data.reverse()]);
            }
        }
        fetchPosts();
    }, [user, location.pathname]);

    return (
        <div className="view home">
            <RequestManager user={user} />
            <PostGallery posts={posts} />
            <Explore user={user} />
            {clickedPost ?
                <OpenedPost post={clickedPost} close={()=> navigate("/home")}/> : <></>
            }
        </div>
    )
}

export default Home;