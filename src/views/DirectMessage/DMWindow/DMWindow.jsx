import "./DMWindow.css";
import message from "../../../assets/gray-message.png";

import DMHeader from "./DMHeader/DMHeader";
import DMHistory from "./DMHistory/DMHistory";
import MessageBar from "./MessageBar/MessageBar";

import { useState, useEffect } from 'react';
import { addMessage, getMessageHistory } from '../../../services/DMServices';

function DMWindow({ sender, receiver }) {
  const [messages, setMessages] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  function fetchMessages() {
    console.log("fetch");
    getMessageHistory(sender, receiver)
      .then(data => {
        setMessages(data)
      });
  }
  useEffect(fetchMessages, [receiver]);

  async function send(content) {
    const message = {
      sender: sender,
      receiver: receiver,
      content: content,
      timestamp: JSON.stringify(new Date),
    }
    console.log(message);
    addMessage(message)
      .then(fetchMessages());
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