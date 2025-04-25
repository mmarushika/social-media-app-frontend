import "./DMList.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getData, addData } from "../../../services/PostServices";
import add from "../../../assets/add-white.png";
import DMContact from "../DMContact/DMContact";
import User from "../../../components/User/User";


function DMList({ sender, selectDMContact }) {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    function fetchContacts() {
        console.log("fetch");
        getData(`http://localhost:8000/messages/contacts?sender=${sender}`)
            .then(data => {
                data.forEach(i => console.log(i));
                setContacts(data)
            });
    }
    useEffect(fetchContacts, []);

    return (
        <div className="dm-list">
            <div className="current-user-dm-list-wrapper">
                <User currentUser={sender} username={sender} mode="static" />
                <div className="add-contact-wrapper" onClick={() => navigate("/inbox/contacts")}>
                    <img className="add-contact-image" src={add}></img>
                </div>
            </div>
            <div className="messages-header">
                <div>Messages</div>
            </div>
            {contacts.map(i => <DMContact contact={i} onClick={() => navigate("/inbox/"+i)} />)}
        </div>
    );
}
export default DMList;