import "./DMHistory.css";

import Message from "../Message/Message";

import { useEffect, useRef } from "react";

function DMHeader({ messages, sender }) {
    const listMsgs = useRef(null);

    function getType(i) {
        if (i.sender == sender) {
            //console.log("sent");
            return "sent";
        } else {
            //console.log("received");
            return "received";
        }
    }
    /* useEffect(() => {      
        listMsgs.current?.lastElementChild?.scrollIntoView();
    }, [messages]); */

    return (
        <div className="dm-history" ref={listMsgs}>
            <div className="dm-wrapper">
                {messages.map(i => <Message type={getType(i)} content={i.content} timestamp={i.timestamp} />)}
            </div>
        </div>
    );
}
export default DMHeader;