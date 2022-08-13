const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { v4 } = require("uuid");
require("dotenv").config();
const { Server } = require("socket.io");
const { authenticateKey } = require("./utils/auth");

const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Helper function
// const { default: returnDir } = require("./Utilities/returnDir");
//MongoDB Config
// const mongoose = require("mongoose");
// const dbURI = process.env.MONGODB_URI;

//Server Socketio Initiation

io.on("connection", (socket) => {
  console.log("Connected");
});

//Middleware set cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

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
