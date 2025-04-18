import "./PostHistory.css";
import Post from "../Post/Post";

import {useEffect, useRef} from "react";

function PostHistory({posts, clickPost}) {
    const postList = useRef(null);

    useEffect(() => {   
        // scrolls to the most recent message   
        console.log(postList.current?.firstElementChild);
        postList.current?.firstElementChild?.scrollIntoView();
    }, [posts]);

    return (
        <div className="post-history" ref={postList} >
            {posts.map(i => <Post key={i._id} post={i} onClick={clickPost} />)}
        </div>
    )
}

export default PostHistory;