require('dotenv').config()
const http = require('http');
const express = require("express");
const cors = require("cors")
const app = express();
const server = http.createServer(app);
const ConnectDb = require('./Database');
ConnectDb();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json());
const socket = require('./Socket');

app.use('/api/auth/signup',require('./Routes/Auth/Signup'));
app.use('/api/auth/login',require('./Routes/Auth/Login'));
app.use('/api/message',require('./Routes/Message'));

server.listen(`${process.env.PORT}`,()=>{
  socket(server);
  console.log(`port running at ${process.env.PORT}`);
})

