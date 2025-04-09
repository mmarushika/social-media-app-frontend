import "./MessageBar.css";
import {useState} from 'react';

function MessageBar({onClick}) {
    const [currentText, setCurrentText] = useState("");
    function updateCurrentText(event) {
        setCurrentText(event.target.value);
    }
    return (
        <div className="message-bar">
            <textarea value = {currentText} className="message-field" onChange={updateCurrentText}></textarea>
            <button className="send-button" onClick={() => {
                if(currentText !== "" ) {
                    onClick(currentText);
                    setCurrentText("");
                }
            }}>Send</button>
        </div>
    );
}
export default MessageBar;