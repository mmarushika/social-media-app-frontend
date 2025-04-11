import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar/NavBar.jsx';
import Auth from './views/Auth/Auth.jsx';
import DirectMessage from './views/DirectMessage/DirectMesssage.jsx';
import Profile from './views/Profile/Profile.jsx';
const sender = "Alice";
const receiver = "Bob";

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/inbox" element={<DirectMessage sender="Alice"/>}/>
      <Route path="/user" element={<Profile user="Alice"/>}/>
    </Routes>
  </BrowserRouter>,
)
