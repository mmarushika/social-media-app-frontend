import "./DMList.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getData, addData } from "../../../services/PostServices";
import add from "../../../assets/add-white.png";
import DMContact from "../DMContact/DMContact";


function DMList({ sender, selectDMContact }) {
    const navigate = useNavigate();
    const [dmList, setDMList] = useState([]);

    function fetchDMList() {
        console.log("fetch");
        getData(`http://localhost:8000/dm-list?sender=${sender}`)
            .then(data => {
                data.forEach(i => console.log(i));
                setDMList(data)
            });
    }
    useEffect(fetchDMList, []);

    return (
        <div className="dm-list">
            <div className="current-user-dm-list-wrapper">
                <DMContact contact={sender} selectDMContact={() =>{}} />
                <div className="add-contact-wrapper" onClick={() => navigate("/inbox/contacts")}>
                    <img className="add-contact-image" src={add}></img>
                </div>
            </div>
            <div className="messages-header">
                <div>Messages</div>
            </div>
            {dmList.map(i => <DMContact contact={i} onClick={selectDMContact} />)}
        </div>
    );
}
export default DMList;