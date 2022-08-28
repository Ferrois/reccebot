const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { v4 } = require("uuid");
require("dotenv").config();
const { authenticateKey } = require("./utils/auth");

const server = require("http").createServer(app);

//Helper function
// const { default: returnDir } = require("./Utilities/returnDir");
//MongoDB Config
// const mongoose = require("mongoose");
// const dbURI = process.env.MONGODB_URI;

//Server Socketio Initiation
var WebSocketServer = require("ws").Server;

app.use(express.static(__dirname + "/"));

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

server.listen(process.env.PORT || PORT, () => console.log("connected to port"));

var wss = new WebSocketServer({ server: server });
console.log("Websocket Server Initiated");

var clients = [];

// rbmovew
// rbmoves
// rbmovea
// rbmoved
// rbalarm
// rbradar (toggler)

// rcusd(angle,distance)
// rcpir
// rcbtn
// rcgps(lat,long)
// rcsnd

function sendToAll(data) {
  clients.forEach((client) => {
    client.send(data);
  });
}

function botCB(ws, dataString) {
  //to be sent to the client
  console.log("bot");
  switch (dataString) {
    case "usd":
      break;
    case "pir":
      break;
    case "btn":
      break;
    case "gps":
      break;
    case "snd":
      break;
    default:
      console.log("Invalid Command");
      break;
  }
}

function clientCB(ws, dataString) {
  //to be sent to the robot
  console.log("Command: " + dataString);
  switch (dataString) {
    case "connections":
      console.log("Connections: " + clients.length);
      ws.send("Connections: " + clients.length);
      break
    case "movew":
      sendToAll("movew");
      break;
    case "moves":
      sendToAll("moves");
      break;
    case "movea":
      sendToAll("movea");
      break;
    case "moved":
      sendToAll("moved");
      break;
    case "alarm":
      sendToAll("alarm");
      break;
    case "radar":
      console.log("Toggle Radar");
      sendToAll("radar");
      break;
    default:
      console.log("Invalid Commandxxx");
      break;
  }
}

wss.on("connection", (ws) => {
  console.log("Connection Request...");
  clients.push(ws);

  ws.on("message", (message) => {
    //broadcast the message to all the clients
    const dataString = message.toString();
    if (dataString == "ping"){ws.send("pong")};
    switch (
      dataString.slice(0, 2) //Checks if it is a bot msg or client msg
    ) {
      case "rb": //If it is a bot message
        botCB(ws, dataString.slice(2));
        break;
      case "rc": //If it is a client message
        clientCB(ws, dataString.slice(2));
        break;
      default:
        break;
    }
  });

  ws.on("ping", () => {
    
  })

  const pingpong = setInterval(()=>{
      ws.ping();
    } , 5000)

  ws.on("pong", () => {
    ws.send("Pong received");
  });

  ws.on("close", () => {
    console.log("Client Disconnected");
    clients = clients.filter((client) => client !== ws);
    clearInterval(pingpong);
  });
});

// wss.on("connection", (ws) => {
//   console.log("Bot connection request...");
//   bots.push(ws);

//   const id = setInterval(function () {
//     ws.send("Hello from the server");
//   }, 1000);

//   console.log("Websocket connection open");

//   ws.on("message", (message) => {
//     console.log(message.toString());
//   });

//   ws.on("close", () => {
//     console.log("Websocket connection closed");
//     clearInterval(id);
//   });
// });
