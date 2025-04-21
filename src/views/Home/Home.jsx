import "./Home.css";

import Explore from "./Explore/Explore";
import RequestManager from "./RequestManager/RequestManager";

function Home({user}) {
    return (
        <div className="view home">
            <RequestManager user={user} />
            <Explore user={user} />
        </div>
    )
}

export default Home;