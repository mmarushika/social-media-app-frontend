import "./DMList.css";

import { useState, useEffect } from "react";
import { getData, addData } from "../../../services/PostServices";
function DMList({sender}) {
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
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}

            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
            {dmList.map(i => <h1>{i}</h1>)}
        </div>
    );
}
export default DMList;