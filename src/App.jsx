import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [view, setView] = useState("chat");

  function getView() {
    if(view == "chat") {
      return <ChatWindow></ChatWindow>
    }
  }
  return (
    <div className="app">
       <NavBar />
       {getView()}
    </div>
  );
}

export default App
