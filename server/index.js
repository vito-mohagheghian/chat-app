const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.listen(3001);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", (data) => {
    console.log("joind room", data);
    socket.join(data.room);
  });

  socket.on("send_message", (data) => {
    console.log("joind room", data);
    socket.to(data.room).emit(data.message);

    socket.to(data.room).emit("receive_message", data);
  });

  // socket.on("send_message", (data) => {
  //   console.log("joind room", data);
  //   socket.to(data.room).emit(data.message);
  // });

  // socket.join("")
  //   socket.on("disconnect", () => {
  //     console.log("user disconnected");
  //   });
});
