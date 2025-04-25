import { useState, useEffect } from 'react'
import { Navigate, Routes, Route, useNavigate, useLocation } from 'react-router';
import './index.css'
import NavBar from './components/NavBar/NavBar.jsx';
import Login from './views/Login/Login.jsx';
import Signup from './views/Signup/Signup.jsx';
import DirectMessage from './views/DirectMessage/DirectMesssage.jsx';
import ProfileHome from './views/ProfileHome/ProfileHome.jsx';
import Home from './views/Home/Home.jsx';

import { getData, addData } from './services/PostServices.js';
const sender = "Alice";
const receiver = "Bob";

const PrivateRoute = ({ isAuthenticated, view }) => {
  return isAuthenticated ? view : <Navigate to="/login" />
};


function App() {
  const [user, setUser] = useState({ isAuthenticated: false, username: null });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function fetchUsers() {
      const data = await getData(`http://localhost:8000/users`);
      console.log(data);
      setUsers([...data.filter((i) => i != user)]);
    }
    fetchUsers();
  }, [user, location.pathname]);
    
  function authenticate(username, password) {
    console.log(username, password);
    getData(`http://localhost:8000/auth?username=${username}&password=${password}`)
      .then(res => {
        console.log(res);
        if(res.isAuthenticated == true) {
          setUser({ isAuthenticated: true, username: username });
        } else {
          navigate("/login");
        }
      })
  }
  function signup(username, password) {
    const user = {
        username: username,
        password: password
    }
    console.log(username, password);
    addData(`http://localhost:8000/signup`, user)
        .then(setUser({isAuthenticated: true, username: user.username}))
        .then(navigate("/profile/new"));
  }

  return (
    <div>
      {user.isAuthenticated ? <NavBar user={user.username}/> : <></>}
      <Routes>
        <Route path="/login" element={user.isAuthenticated ? <Navigate to={"/home"} /> :<Login authenticate={authenticate}/>} />
        <Route path="/signup" element={<Signup signup={signup}/>} />
        <Route path="/home"
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<Home user={user.username} />} />}></Route>
        <Route path={"/inbox"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<DirectMessage sender={user.username} receiver="" updateContacts={false}/>} />}></Route>
        <Route path={"/inbox/contacts"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<DirectMessage sender={user.username} reciever="" updateContacts={true}/>} />}></Route>
        {users.map(username => 
        <Route path={"/inbox/" + username}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<DirectMessage sender={user.username} receiver={username} updateContacts={false}/>} />}></Route>
        )}
        <Route path={"/profile/new"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={user.username} viewer={user.username} createPost={false} setProfile={true} 
              viewFollwers={false} viewFollowing={false}/>} />}></Route>
        {users.map(username => 
        <Route path={"/" + username}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={username} viewer={user.username} createPost={false} setProfile={false}
              viewFollwers={false} viewFollowing={false}/>} />}></Route>
        )}
        {users.map(username => 
        <Route path={"/" + username + "/create"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={user.username} viewer={user.username} createPost={true} setProfile={false} 
              viewFollwers={false} viewFollowing={false}/>} />}></Route>
        )}
        {users.map(username => 
        <Route path={"/" + username + "/view"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={username} viewer={user.username} createPost={false} setProfile={false}
              viewFollwers={false} viewFollowing={false}/>} />}></Route>
        )}
        {users.map(username => 
        <Route path={"/" + username + "/followers"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={username} viewer={user.username} createPost={false} setProfile={false} 
              viewFollowers={true} viewFollowing={false}/>} />}></Route>
        )}
        {users.map(username => 
        <Route path={"/" + username + "/following"}
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={username} viewer={user.username} createPost={false} setProfile={false} 
              viewFollowers={false} viewFollowing={true}/>} />}></Route>
        )}
        </Routes>
    </div>

  );
}

/*
<Route path="/" element={user.isAuthenticated ? 
          <DirectMessage sender={user.username} /> : <ProfileHome user={user.username} /> } />
        <Route path="/inbox" element={user.isAuthenticated ? 
          <DirectMessage sender={user.username} /> : <Login authenticate={authenticate} /> } />
        <Route path="/user" element={user.isAuthenticated ? 
          <ProfileHome user={user.username} />  : <Login authenticate={authenticate} /> } />*/

/*<Route path="/inbox" element={
          <PrivateRoute
            user = {user}
            view={<DirectMessage sender={user.username} />}
          />} />
        <Route path="/user" element={
          <PrivateRoute
            user = {user}
            view={<ProfileHome user={user.username} />}
          />} />*/
export default App;
