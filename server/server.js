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

const dbURI = process.env.MONGODB_URI;

//Server Initiation
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//import schemas
const UserSchema = require("./Models/UserData.js");
console.log(dbURI);

// mongoose.connect(`${dbURI}`, () => console.log("Conntected to MongoDB"));

server.listen(process.env.PORT || PORT, () => {
  console.log("Listening on port", process.env.PORT || PORT);
});