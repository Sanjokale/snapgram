const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const mongoose = require("mongoose");
const dbConnect = require("./utils/db");
const UserRoute = require("./routes/users");
const postRoute = require("./routes/posts");
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");


dbConnect();

app.use("/static", express.static(path.join(__dirname, "../uploads")));

app.use(express.json());
app.use(cors());
app.use(UserRoute);
app.use(postRoute);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("sendMsg", (msg) => {
    // this is like  get  rest api on router recieveMethod and data
    io.emit("recieveMsg", msg); //this is like post method on sendMessage router
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}` || 8080);
});
