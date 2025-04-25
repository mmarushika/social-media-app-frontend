import "./PostHistory.css";
import Post from "../Post/Post";

import {useEffect, useRef} from "react";

function PostHistory({ posts}) {
    const postList = useRef(null);
    
    useEffect(() => {   
        // scrolls to the most recent message   
        console.log(postList.current?.firstElementChild);
        postList.current?.firstElementChild?.scrollIntoView();
    }, [posts]);

    return (
        <div className="post-history" ref={postList} >
            {posts ? posts.map(i => <Post key={i._id} post={i} />) : <></>}
        </div>
    )
}

export default PostHistory;