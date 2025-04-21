import "./Explore.css";
import {useState, useEffect} from "react";
import { getData } from "../../../services/PostServices";
import User from "../../../components/User/User";

function Explore({user}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const data = await getData(`http://localhost:8000/users`);
            console.log(data);
            console.log(data);
            setUsers([...data.filter((i) => i != user)]);
        }
        fetchPosts();
    }, []);

    return (
        <div className="explore">
            <div className="explore-wrapper">
                <div className="explore-current-user-wrapper">
                    <User isCurrentUser={true} username={user} mode={"explore"}></User>
                </div>
                <div className="explore-header">Explore</div>
                <div className="scroll-y">
                    {users.map(i => <User key={i} isCurrentUser={false} username={i} mode={"explore"}/>)}
                </div>
            </div>
        </div>
    )
}


export default Explore;