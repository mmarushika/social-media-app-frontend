import "./Signup.css";

import {useState} from "react";
import {Link} from "react-router";
import { addData } from "../../services/PostServices";
function Signup({signup}) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className="signup">
            <div className="signup-field">
                <div className="signup-field-wrapper">
                    <input className="signup-input-field" name="username" type="text" placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value);
                    }}></input><br></br>
                    <input className="signup-input-field" name="username" type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}></input><br></br>
                    
                    <br></br>
                    <button className="signup-button" onClick={() => {signup(username, password) }}>Sign Up</button><br></br>
                    <div>- OR -</div>
                    <Link className="login-link" to="/login" >Log In</Link>
                </div>
            </div>
        </div>
    )
}
export default Signup;

/*

<input className="signup-input-field" name="username" type="password" placeholder="Confirm Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}></input><br></br>
                    
*/