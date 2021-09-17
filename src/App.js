import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageBoard, setMessageBoard] = useState([]);

  socket.on("newPost", (data) => {
    setMessageBoard([...messageBoard, data]);
  });

  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("join", (data) => {
      console.log(data);
    });
  }, []);

  const handleChange = (e) => {
    console.log(e);
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("post", message);
  };

  return (
    <div className="App">
      <h1>CHAT</h1>
      <div className="chatbox">
        {messageBoard.map((msg, idx) => (
          <li key={`${msg[0]}-${idx}`}>{msg}</li>
        ))}
      </div>
      <div>
        <input
          type="text"
          name="message"
          onChange={handleChange}
          value={message}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default App;
