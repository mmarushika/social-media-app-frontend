import "./RequestManager.css";
import refresh from "../../../assets/refresh.png";
import emptyBox from "../../../assets/empty-box.png";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { updateData, getData } from "../../../services/PostServices";
import User from "../../../components/User/User";

function RequestManager({ user, viewer }) {
    const location = useLocation();
    const [requests, setRequests] = useState([]);
    const [requested, setRequested] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        async function fetchRequests() {
            const data = await getData(`http://localhost:8000/follow/requests?username=${user}`);
            console.log(data);
            setRequests([...data]);
        }
        async function fetchRequested() {
            const data = await getData(`http://localhost:8000/follow/requested?username=${user}`);
            console.log(data);
            setRequested([...data]);
        }
        fetchRequests();
        fetchRequested();
    }, [location.pathname, update]);

    function acceptRequest(currentUser, username) {
        const request = { account: currentUser, requester: username }
        updateData(`http://localhost:8000/follow/request/accept`, request)
        setUpdate(x => x + 1);
    }
    function cancelRequest(currentUser, username) {
        const request = { account: username, requester: currentUser }
        updateData(`http://localhost:8000/follow/request/cancel`, request)
        setUpdate(x => x + 1);
    }

    return (
        <div className="request-manager">
            <div className="explore-wrapper">
                <div className="flex-inline">
                    <div className="explore-current-user-wrapper">
                        <User isCurrentUser={true} username={user} mode={"explore"}></User>
                    </div>
                    <div className="refresh-wrapper" onClick={() => setUpdate(x => x + 1)}>
                        <img className="refresh-image" src={refresh}></img>
                    </div>
                </div>
                <div className="request-header">
                    <div>Requests</div>
                </div>
                <div className="request-list scroll-y">
                    {requests.length == 0 ?
                        <div>
                        <div className="empty-box-wrapper" onClick={() => setUpdate(x => x + 1)}>
                            <img className="empty-box-image" src={emptyBox}></img>
                        </div>
                        <div className="gray"><b>No Follow Requests!</b></div>
                    </div>
                        :
                        requests.map(i => <User key={i} currentUser={user} username={i}
                            mode={"requests"} acceptRequest={acceptRequest} cancelRequest={cancelRequest} />)
                    }
                </div>
                <div className="request-header">
                    <div>Requested</div>
                </div>
                <div className="request-list scroll-y">
                    {requested.length == 0 ?
                        <div>
                            <div className="empty-box-wrapper" onClick={() => setUpdate(x => x + 1)}>
                                <img className="empty-box-image" src={emptyBox}></img>
                            </div>
                            <div className="gray"><b>No Follows Requested!</b></div>
                        </div>
                        :
                        requested.map(i => <User key={i} currentUser={user} username={i}
                            mode={"requested"} acceptRequest={acceptRequest} cancelRequest={cancelRequest} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestManager;