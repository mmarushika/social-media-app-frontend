import './PostGallery.css';

import StandalonePost from '../StandalonePost/StandalonePost';

function PostGallery({posts}) {
    return (
        <div className="post-gallery">
           {posts.map(i => <StandalonePost post={i} />)}
        </div>
    )
}

export default PostGallery;