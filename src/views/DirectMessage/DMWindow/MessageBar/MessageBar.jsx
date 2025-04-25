import "./MessageBar.css";

import sendIcon from "../../../../assets/send.png";
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
                <img className="send-button" src={sendIcon} onClick={() => {
                    if (currentText !== "") {
                        onClick(currentText);
                        setCurrentText("");
                    }
                }}></img>
                </div>
            </div>
        </div>
    );
}
export default MessageBar;