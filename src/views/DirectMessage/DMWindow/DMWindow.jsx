import "./DMWindow.css";
import message from "../../../assets/gray-message.png";

import DMHeader from "./DMHeader/DMHeader";
import DMHistory from "./DMHistory/DMHistory";
import MessageBar from "./MessageBar/MessageBar";

import { useLocation } from "react-router";
import { useState, useEffect } from 'react';
import { addData, getData } from '../../../services/PostServices';

function DMWindow({ sender, receiver }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [update, setUpdate] = useState(0);

  setInterval(() => {
    //setUpdate(x => x + 1)
  }, 1000);

  function fetchMessages() {
    console.log("fetch");
    getData(`http://localhost:8000/messages?sender=${sender}&receiver=${receiver}`)
      .then(data => {
        setMessages(data)
      });
  }
  useEffect(fetchMessages, [update, location.pathname]);

  async function send(content) {
    const message = {
      sender: sender,
      receiver: receiver,
      content: content,
      timestamp: JSON.stringify(new Date()),
    }
    console.log(message);
    console.log(sender, receiver)
    addData(`http://localhost:8000/messages/send?sender=${sender}&receiver=${receiver}`, message)
      .then(setUpdate(x => x + 1));
  }
  return (
    <div className="dm-window">
      {receiver == "" ?
        <div className="send-message">
          <div className="message-image-wrapper">
            <img className="contain-image" src={message}></img>
          </div>
          <div className="message-image-caption">Send a Message!</div>
        </div>
        :
        <div>
          <DMHeader name={receiver} />
          <DMHistory messages={messages} sender={sender} />
          <MessageBar onClick={send} />
        </div>
      }
    </div>
  )
}

export default DMWindow;