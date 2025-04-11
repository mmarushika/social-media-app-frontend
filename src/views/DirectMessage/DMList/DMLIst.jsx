import "./DMList.css";

import { useState, useEffect } from "react";
import { getData, addData } from "../../../services/PostServices";

import DMContact from "../DMContact/DMContact";

function DMList({sender, selectDMContact}) {
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
            {dmList.map(i => <DMContact contact={i} onClick={selectDMContact} />)}
        </div>
    );
}
export default DMList;