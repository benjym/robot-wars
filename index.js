const express = require("express");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
var BBG_ID = 0;

const port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/')); // serve data files

io.on('connection', (socket) => { // when a user connects
  console.log('a user connected');

  socket.on('i-am-the-BBG', id => {
      console.log('The BBG connected with socket id ' + id)
      BBG_ID = id;
  });

  socket.on('front-end-loader', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team' + team);
    socket.to(BBG_ID).emit('front-end-loader', (actuator, value, team, token ));
  });

  socket.on('dump-truck', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team' + team);
    socket.to(BBG_ID).emit('dump-truck', (actuator, value, team, token ));
  });

  socket.on('excavator', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team' + team);
    socket.to(BBG_ID).emit('excavator', (actuator, value, team, token ));
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
