import ChatHeader from "./ChatHeader/ChatHeader";
import ChatHistory from "./ChatHistory/ChatHistory";
import MessageBar from "./MessageBar/MessageBar";

import {useState, useEffect} from 'react';
import {addData, getData} from '../../services/ChatServices';
  
function ChatWindow({sender, receiver}) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    getData()
      .then(data => {
        setMessages(data)});
  }
  useEffect(fetchMessages);

  async function handleSend(content) {
    const message = {
      sender : sender,
      receiver : receiver,
      content : content,
      timestamp : JSON.stringify(new Date),
    }
    console.log(message);
    await addData(message);
  }
    return (
        <div className="chat-window">
            <ChatHeader name={receiver} />
            <ChatHistory messages={messages} sender={sender}/>
            <MessageBar onClick={handleSend}/>
        </div>
    )
}

export default ChatWindow;