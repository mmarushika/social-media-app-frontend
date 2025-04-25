import "./DirectMessage.css";

import DMList from "./DMList/DMList";
import DMWindow from "./DMWindow/DMWIndow";
import ContactsPopup from "./ContactsPopup/ContactsPopup";

import { useNavigate } from "react-router";
import {useState} from "react";

function DirectMessage({sender, receiver, updateContacts}) {
    console.log(sender, receiver)
    const navigate = useNavigate();
    /*const [currentContact, setContact] = useState("");
    function selectDMContact(contact) {
        console.log("contact");
        setContact(contact);
    }*/

    function messageContact(contact) {
        //setContact(contact);
        navigate("/inbox/"+contact);
    }
    return (
        <div className="view direct-message">
            <DMList sender={sender} /*selectDMContact={selectDMContact}*/></DMList>
            <DMWindow sender={sender} receiver={receiver}></DMWindow>
            {
                updateContacts ? 
                    <ContactsPopup user={sender} messageContact={messageContact}/> : <></>
            }
        </div>
    );
}
export default DirectMessage;
//<DMList sender={sender}></DMList>