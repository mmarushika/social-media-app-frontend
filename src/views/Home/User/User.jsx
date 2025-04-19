import "./User.css";
import profilePlaceholder from "../../../assets/profile-white.png";
import {useNavigate} from "react-router";
import {useState, useEffect} from "react";
import { getImageUrl, getData } from "../../../services/PostServices";

function User({isCurrentUser, username, mode, acceptHandler, rejectHandler}) {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [profile, setProfile] = useState({name: "", imageFilepath: ""});
    const location = isCurrentUser ? `/${username}` : `/${username}/view`;
    console.log(mode);
    // Declare effects
    // Fetch and set profile to get profile image
    useEffect(() => {
        function fetchProfile() {
            getData(`http://localhost:8000/profile?username=${username}`)
                .then(data => setProfile(data))
        }
        fetchProfile();
    }, [location.pathname]);
    // Fetch and set profile image
    useEffect(() => {
        function fetchImageUrl(filepath) {
            getImageUrl(filepath).then(url => {
                setImageUrl(url);
            });
        }
        if(profile.imageFilepath != ""){
            fetchImageUrl(profile.imageFilepath);
        } 
    }, [profile, location.pathname]);   

    return (
            <div className={mode+"-user-button"} onClick={() => navigate(location)}>
                <div className={"user-button-profile-wrapper"}>
                    {imageUrl ?
                        <img className="profile-photo" src={imageUrl}></img> :
                        <img className="profile-photo" src={profilePlaceholder}></img>
                    }
                </div>
                <div className={"user-button-info-wrapper"}>
                    <div className="white"><b>{username}</b></div>
                    <div className="gray">{profile.name}</div>
                </div>
                {mode == "requests" ?
                    <div>
                        <button className="profile-button" onClick={acceptHandler}>Accept</button>
                        <button className="profile-button" onClick={rejectHandler}>Reject</button>
                    </div> : <></>
                }
            </div>
        
    )
}

export default User;