import "./DMWindow.css";

import DMHeader from "./DMHeader/DMHeader";
import DMHistory from "./DMHistory/DMHistory";
import MessageBar from "./MessageBar/MessageBar";

import {useState, useEffect} from 'react';
import {addMessage, getMessageHistory} from '../../../services/DMServices';
  
function DMWindow({sender, receiver}) {
  const [messages, setMessages] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  function fetchMessages() {
    console.log("fetch");
    getMessageHistory()
      .then(data => {
        setMessages(data)});
  }
  useEffect(fetchMessages, []);

  async function handleSend(content) {
    const message = {
      sender : sender,
      receiver : receiver,
      content : content,
      timestamp : JSON.stringify(new Date),
    }
    console.log(message);
    addMessage(message)
    .then(fetchMessages());
  }
    return (
        <div className="dm-window">
            <DMHeader name={receiver} />
            <DMHistory messages={messages} sender={sender}/>
            <MessageBar onClick={handleSend}/>
        </div>
    )
}

export default DMWindow;