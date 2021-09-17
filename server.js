const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", function (req, res) {
  res.send("<h1>test</h1>");
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  console.log("socket connection was made");
  socket.emit("welcome", "Welcome to my first socketio app");
  socket.broadcast.emit("join", "Someone has joined the server");
  socket.on("post", (data) => {
    io.emit("newPost", data);
  });
});
