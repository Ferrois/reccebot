const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { v4 } = require("uuid");
require("dotenv").config();
const { authenticateKey } = require("./utils/auth");
const { Blob } = require("buffer");

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

var aiIsOn = false;
var motionDetected = false;
var buttonPressed = false;


function aiFunction(){
  if (aiIsOn == false) return
  if (motionDetected){

  }
  if (buttonPressed){
    
  }
  
}

function sendToAll(data) {
  clients.forEach((client) => {
    client.send(data);
  });
}

function botCB(ws, dataString) {
  //to be sent to the client
  // console.log("bot");
  switch (dataString.slice(0, 3)) {
    case "usd":
      sendToAll(dataString);
      break;
    case "pir":
      sendToAll("pir");
      break;
    case "btn":
      sendToAll("btn");
      break;
    case "gps":
      break;
    case "snd":
      sendToAll("snd1");
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
      break;
    case "moves":
      sendToAll("moves");
      break;
    case "movew":
      sendToAll("movew");
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
    case "ai0":
      if (aiIsOn == false) return
      aiIsOn = false;
      sendToAll("aioff")
      break
    case "ai1":
      if (aiIsOn == true) return
      aiIsOn = true;
      sendToAll("aion");
      break
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
    if (message.toString("base64").length > 100) {
      // var urlObject = URL.createObjectURL(message.data);
      // view.src = urlObject;
      console.log("Blob");
      sendToAll("img"+message.toString("base64"));
      // const b64 = message.toString("base64");
      // NOTE:
      // Because 'rest' appears to be a buffer, you might not
      // need to do `Buffer.from(...)`,you may have to do something like:
      /** const b64 = rest.toString('base64'); **/
      // const mimeType = "image/png"; // e.g., image/png

      // res.send(`<img src="data:${mimeType};base64,${b64}" />`);
    }
    const dataString = message.toString();
    if (dataString == "ping") {
      ws.send("pong");
    }
    switch (
      dataString.slice(0, 2) //Checks if it is a bot msg or client msg
    ) {
      case "**":
        sendToAll(dataString.slice(2));
        break;
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

  ws.on("ping", () => {});

  const pingpong = setInterval(() => {
    ws.ping();
  }, 6000);

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
