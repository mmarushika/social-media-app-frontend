import "./DMHistory.css";

import Message from "../Message/Message";

import { useEffect, useRef } from "react";

function DMHistory({ messages, sender }) {
    const msgList = useRef(null);

    function getType(i) {
        if (i.sender == sender) {
            //console.log("sent");
            return "sent";
        } else {
            //console.log("received");
            return "received";
        }
    }

    return (
        <div className="dm-history">
            <div className="dm-wrapper">
                {messages.map(i => <Message type={getType(i)} content={i.content} timestamp={i.timestamp} />)}
            </div >
        </div>
    );
}
export default DMHistory;