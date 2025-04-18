import "./User.css";
import profilePlaceholder from "../../../assets/profile-white.png";
import {Link, useNavigate} from "react-router";
import {useState, useEffect} from "react";
import { getImageUrl, getData } from "../../../services/PostServices";

function User({isCurrentUser, username}) {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [profile, setProfile] = useState({name: "", imageFilepath: ""});
    const location = isCurrentUser ? `/${username}` : `/${username}/view`;
    // Declare effects
    useEffect(fetchProfile, []);
    useEffect(() => {
        if(profile.imageFilepath != "") fetchImageUrl(profile.imageFilepath)
    }, [profile]);   

    // Declare fetch functions
    function fetchImageUrl(filepath) {
        console.log(filepath);
        getImageUrl(filepath).then(url => {
            console.log(url);
            setImageUrl(url);
        });
    }
    
    function fetchProfile() {
        getData(`http://localhost:8000/profile?username=${username}`)
            .then(data => setProfile(data))
    }
    return (
            <div className="user-button" onClick={() => navigate(location)}>
                <div className="user-button-profile-wrapper">
                    {imageUrl ?
                        <img className="profile-photo" src={imageUrl}></img> :
                        <img className="profile-photo" src={profilePlaceholder}></img>
                    }
                </div>
                <div className="user-button-info-wrapper">
                    <div className="white"><b>{username}</b></div>
                    <div className="gray">{profile.name}</div>
                </div>
            </div>
        
    )
}

export default User;