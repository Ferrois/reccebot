const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { v4 } = require("uuid");
require("dotenv").config();


const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Helper function
// const { default: returnDir } = require("./Utilities/returnDir");
//MongoDB Config
// const mongoose = require("mongoose");
// const dbURI = process.env.MONGODB_URI;

//Server Socketio Initiation
var WebSocketServer = require("ws").Server

app.use(express.static(__dirname + "/"))

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
// var server = http.createServer(app)


//Middleware set cors

app.use(express.json());

//Endpoint baseroute
app.get("/", async (req, res) => {
  res.json("Server for Reccebot");
});

app.post("/auth", async (req, res) => {
  const input = req.body.input || "";
  if (!authenticateKey(input))
  return res.json({ success: false, message: "Invalid Key" });
  return res.json({ success: true, message: "Valid Key" });
});

//Server Initiation

server.listen(process.env.PORT || PORT , () => console.log("connected to port"));
var wss = new WebSocketServer({server: server})
console.log("Websocket Server Initiated")

wss.on("connection", (ws) => {
  var id = setInterval(function() {
    ws.send("Hello from the server")
  }, 1000);

  console.log("Websocket connection open")

  ws.on("close", () => {
    console.log("Websocket connection closed")
    clearInterval(id)
  })
})
