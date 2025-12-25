import "./index.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

 return (
  <div className="app">
    <h1>Simple Chat App</h1>

    <div className="messages">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          {message}
        </div>
      ))}
    </div>

    <div className="input-area">
      <input
        type="text"
        value={messageInput}
        placeholder="Type your message..."
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
}

export default App;
