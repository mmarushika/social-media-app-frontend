import "./Requests.css";
import refresh from "../../../assets/refresh.png";

import {useState, useEffect} from "react";
import {useLocation} from "react-router";
import { getData } from "../../../services/PostServices";
import User from "../User/User";

function Requests({user}) {
    const location = useLocation();
    const [requests, setRequests] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        async function fetchRequests() {
            const data = await getData(`http://localhost:8000/follow/requests?username=${user}`);
            console.log(data);
            setRequests([...data.filter((i) => i != user)]);
        }
        fetchRequests();
    }, [location.pathname, update]);

    function acceptRequest() {
            const request = {account : user, requester: viewer}
            addData(`http://localhost:8000/follow/request/accept`, request)
                .then(fetchFollowStatus());
        }
        function cancelRequest() {
            const request = {account : user, requester: viewer}
            updateData(`http://localhost:8000/follow/request/cancel`, request)
                .then(fetchFollowStatus());
        }

    return (
        <div className="requests">
            <div className="explore-wrapper">
                <div className="explore-current-user-wrapper">
                    <User isCurrentUser={true} username={user} mode={"explore"}></User>
                </div>
                <div className="refresh-header">
                    <div>Requests</div>
                    <div className="refresh-wrapper" onClick={() => setUpdate(x => x + 1)}>
                        <img className="refresh-image"src={refresh}></img>
                    </div>
                </div>
                <div className="scroll-y">
                    {requests.map(i => <User key={i} isCurrentUser={false} username={i} 
                        mode={"requests"} acceptHandler={acceptRequest} cancelRequest={cancelRequest}/>)}
                </div>
            </div>
        </div>
    )
}

export default Requests;