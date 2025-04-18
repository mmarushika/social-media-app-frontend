import "./NavBar.css";

import { Link } from "react-router";

function NavBar() {
    return (
        <div className="nav-bar">
            <div className="nav-bar-wrapper">
                <Link to="/user"><img className="nav-icon" src="src/assets/profile-white.png"></img></Link>
                <Link to="/inbox"><img className="nav-icon" src="src/assets/home-white.png"></img></Link>
                <Link><img className="nav-icon" src="src/assets/create-white.png"></img></Link>
            </div>
        </div>
    );
}

export default NavBar;

