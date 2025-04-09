import "./DMHistory.css";

import Message from "../Message/Message";

function DMHeader({messages, sender}) {
    //console.log(messages);
    function getType(i) {
        if(i.sender == sender) {
            //console.log("sent");
            return "sent";
        } else {
            //console.log("received");
            return "received";
        }
    }
    return (
        <div className="dm-history">
            {messages.map(i => <Message type={getType(i)} content={i.content} timestamp={i.timestamp}/>)}
        </div>
    );
}
export default DMHeader;