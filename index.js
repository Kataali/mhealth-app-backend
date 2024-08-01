
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const http = require("http");
const usersRoute = require("./controller/users.controller");
const modelRoute = require("./controller/model.controller");
medsRoute = require("./controller/medication.controller");

// App config
const app = express();

// Middleware config
app.use(bodyParser.json());
app.use(cors());
app.use('/mhealth-api/users', usersRoute);
app.use('/mhealth-api/disease', modelRoute);
app.use('/mhealth-api/meds', medsRoute);
// Create HTTP server
const server = http.createServer(app);

const io = require('socket.io')(server);

const connectUser = new Set();
io.on('connection', (socket) => {
  console.log('connected successfully', socket.id);
  io.emit("connect-user", connectUser.size);
  connectUser.add(socket.id);
  socket.on('disconnect', () => {
    console.log("Disconnected", socket.id);
    connectUser.delete(socket.id);
    io.emit("connect-user", connectUser.size);

  });

  socket.on('message', (data) => {
    console.log('Message received: ', data);
    socket.broadcast.emit('message-receive', data);
  });
});

// Check database connection and start server
db.query("SELECT 1")
  .then(() => {
    console.log("DB connection successful");
    // Start server
    server.listen(3000, () => console.log("mhealth_app express server started at port 3000"));
  })
  .catch(e => console.log(e + " DB connection unsuccessful"));
