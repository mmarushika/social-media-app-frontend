import "./Home.css";

import Explore from "./Explore/Explore";
import Requests from "./Requests/Requests";

function Home({user}) {
    return (
        <div className="view home">
            <Requests user={user} />
            <Explore user={user} />
        </div>
    )
}

export default Home;