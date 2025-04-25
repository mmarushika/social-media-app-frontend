import "./ContactsPopup.css";

import {useNavigate} from 'react-router';
import { useState, useEffect } from 'react';
import { getData } from '../../../services/PostServices';
import DMContact from '../DMContact/DMContact';

function ContactsPopup({user, messageContact}) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    function close(e) {
        if(e.target.className == "transparent-background") {
            navigate("/inbox");
        }
    }
    useEffect(() => {
        async function fetchFollowing() {
            const data = await getData(`http://localhost:8000/followers/mutual?username=${user}`);
            console.log(data);
            if(data != null) {
                setUsers([...data]);
            }
        }
        fetchFollowing();
    }, []);
    return (
        <div className="transparent-background" onClick={close}>
            <div className="contacts-popup">
                <div className="follow-header">Explore</div>
                <div className="follow-list scroll-y">
                    {users.map(i => <DMContact mode="add-contact" contact={i} onClick={() => messageContact(i)} />)}
                </div>
            </div>
        </div>
    )
}

export default ContactsPopup;