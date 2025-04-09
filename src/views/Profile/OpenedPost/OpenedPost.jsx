import "./OpenedPost.css";

function OpenedPost({ post, onClick }) {
    console.log(post);
    return (
        <div className="opened-post">
            <div className="image-wrapper">
                <img className="opened-post-image" src={post.imageUrl}></img>
            </div>
            <div className="comment-section">
                <label className="bold-heading">Comments</label>
            </div>
        </div>
    );
}
export default OpenedPost;