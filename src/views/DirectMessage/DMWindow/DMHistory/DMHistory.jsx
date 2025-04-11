import "./DMHistory.css";

import Message from "../Message/Message";

import { useEffect, useRef } from "react";

function DMHistory({ messages, sender }) {
    const endMsgRef = useRef(null);

    function getType(i) {
        if (i.sender == sender) {
            //console.log("sent");
            return "sent";
        } else {
            //console.log("received");
            return "received";
        }
    }
    
    // useEffect with empty array only executes when it is mounted
    // https://stackoverflow.com/questions/58101018/react-calling-a-method-on-load-only-once
    // https://stackoverflow.com/questions/72372407/react-auto-scroll-to-bottom-of-a-div

    useEffect(() => {   
        // scrolls to the most recent message   
        console.log(endMsgRef);
        endMsgRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <div className="dm-history">
            <div className="dm-wrapper" >
                {messages.map(i => <Message type={getType(i)} content={i.content} timestamp={i.timestamp} />)}
            </div >
            <div ref={endMsgRef}></div>
        </div>
    );
}
export default DMHistory;