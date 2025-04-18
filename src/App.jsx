import { useState } from 'react'
import { Navigate, Routes, Route, useNavigate } from 'react-router';
import './index.css'
import NavBar from './components/NavBar/NavBar.jsx';
import Login from './views/Login/Login.jsx';
import Signup from './views/Signup/Signup.jsx';
import DirectMessage from './views/DirectMessage/DirectMesssage.jsx';
import ProfileHome from './views/ProfileHome/ProfileHome.jsx';

import { getData, addData } from './services/PostServices.js';
const sender = "Alice";
const receiver = "Bob";

const PrivateRoute = ({ isAuthenticated, view }) => {
  return isAuthenticated ? view : <Navigate to="/login" />
};


function App() {
  const [user, setUser] = useState({ isAuthenticated: false, username: null });
  const navigate = useNavigate();
  function authenticate(username, password) {
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
    addData(`http://localhost:8000/signup`, user)
        .then(setUser({isAuthenticated: true, username: user.username}))
        .then(navigate("/user/account"));
  }
  return (
    <div>
      {user.isAuthenticated ? <NavBar /> : <></>}
      <Routes>
        <Route path="/login" element={user.isAuthenticated ? <Navigate to="/user" /> :<Login authenticate={authenticate}/>} />
        <Route path="/signup" element={<Signup signup={signup}/>} />
        <Route path="/inbox"
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<DirectMessage sender={user.username} />} />}></Route>
        <Route path="/user"
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={user.username} setProfile={false}/>} />}></Route>
          <Route path="/user/account"
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={user.username} createPost={false} setProfile={true}/>} />}></Route>
          <Route path="/user/create"
          element={<PrivateRoute isAuthenticated={user.isAuthenticated} 
            view={<ProfileHome user={user.username} createPost={true} setProfile={false}/>} />}></Route>
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
