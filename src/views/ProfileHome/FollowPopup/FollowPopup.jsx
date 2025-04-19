import "./FollowPopup.css";
import User from "../../Home/User/User";
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import { getData } from "../../../services/PostServices";

function FollowPopup({ user, mode, list }) {
    const location = useLocation();
    const navigate = useNavigate();
    //const [list, setList] = useState([]);
    //const [update, setUpdate] = useState(0);

    /*useEffect(() => {
        async function fetchFollowers() {
            const data = await getData(`http://localhost:8000/followers?username=${user}`);
            console.log(data);
            setList([...data]);
        }
        async function fetchFollowing() {
            const data = await getData(`http://localhost:8000/following?username=${user}`);
            console.log(data);
            setList([...data]);
        }
        mode == "Followers" ? fetchFollowers() : fetchFollowing();
    }, [location.pathname, update]);*/

    function close(e) {
        if(e.target.className == "transparent-background") {
            navigate("/"+user);
        }
    }

    return (
        <div className="transparent-background" onClick={close}>
            <div className="follow-popup">
                <div className="follow-header">{mode}</div>
                <div className="follow-list scroll-y">
                    {list.map(i => <User key={i} currentUser={user} username={i} mode={"explore"}/>)}
                </div>
            </div>
        </div>
    )
}

export default FollowPopup;