import "./Home.css";

import Explore from "./Explore/Explore";
function Home({user}) {
    return (
        <div className="view home">
            <Explore user={user}></Explore>
        </div>
    )
}

export default Home;