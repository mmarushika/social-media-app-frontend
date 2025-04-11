import "./Message.css";

function Message({type, content, timestamp}) {
    return (
        <div className={type + " message"}>
            <div className="message-content">
                {content}
            </div>
            <div className="message-timestamp">
                {timestamp}
            </div>
        </div>

    )
}
export default Message;