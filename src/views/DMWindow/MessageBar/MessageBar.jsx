import "./MessageBar.css";
import { useState } from 'react';

function MessageBar({ onClick }) {
    const [currentText, setCurrentText] = useState("");
    function updateCurrentText(event) {
        setCurrentText(event.target.value);
    }
    return (
        <div className="message-bar-outer">
            <div className="message-bar">
                <textarea placeholder="Send a message" value={currentText} className="message-field" onChange={updateCurrentText}></textarea> 
                <div className="send-button-wrapper">
                <button className="send-button" onClick={() => {
                    if (currentText !== "") {
                        onClick(currentText);
                        setCurrentText("");
                    }
                }}></button>
                </div>
            </div>
        </div>
    );
}
export default MessageBar;