import "./DirectMessage.css";

import DMList from "./DMList/DMList";
import DMWindow from "./DMWindow/DMWIndow";

import {useState} from "react";

function DirectMessage({sender}) {
    const [currentContact, setContact] = useState("Hannah");
    function selectDMContact(contact) {
        console.log("contact");
        setContact(contact);
    }
    return (
        <div className="view direct-message">
            <DMList sender={sender} selectDMContact={selectDMContact}></DMList>
            <DMWindow sender={sender} receiver={currentContact}></DMWindow>
        </div>
    );
}
export default DirectMessage;
//<DMList sender={sender}></DMList>