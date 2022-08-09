const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { v4 } = require("uuid");
require("dotenv").config();

//Helper function
// const { default: returnDir } = require("./Utilities/returnDir");
//MongoDB Config
// const mongoose = require("mongoose");
// const dbURI = process.env.MONGODB_URI;

//Server Socketio Initiation
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Middleware set cors
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST","DELETE"],
      credentials: true,
    })
  );

//Endpoint baseroute
app.get("/",async (req,res)=>{
    res.json("Server for Reccebot")
})

//Server RESTAPI Initiation
server.listen(process.env.PORT || PORT, () => {
  console.log("Listening on port", process.env.PORT || PORT);
});