import "./PostHistory.css";
import Post from "../Post/Post";

function PostHistory({posts, clickPost}) {
    console.log(posts);
    return (
        <div className="post-history">
            {posts.map(i => <Post post={i} onClick={clickPost} />)}
        </div>
    )
}

export default PostHistory;