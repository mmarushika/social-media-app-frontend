import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar/NavBar.jsx';
import Auth from './views/Auth/Auth.jsx';
import DMWindow from './views/DMWindow/DMWIndow.jsx';
import Profile from './views/Profile/Profile.jsx';
const sender = "Alice";
const receiver = "Bob";

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/inbox" element={<DMWindow sender="Alice" receiver="Bob"/>}/>
      <Route path="/user" element={<Profile />}/>
    </Routes>
  </BrowserRouter>,
)
