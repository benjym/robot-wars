const express = require("express");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
var BBG_ID = 0;
var DISPLAY_ID = 0;

const port = process.env.PORT || 3000;
var display_server_id = -1;

app.use('/', express.static(__dirname + '/')); // serve data files

io.on('connection', (socket) => { // when a user connects
  console.log('a user connected');

  socket.on('i-am-the-BBG', id => {
      console.log('The BBG connected with socket id ' + id)
      BBG_ID = id;
  });

  socket.on('i-am-the-DISPLAY', id => {
      console.log('The DISPLAY connected with socket id ' + id)
      DISPLAY_ID = id;
  });

  socket.on('front-end-loader', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(BBG_ID).emit('front-end-loader', actuator, value, team, token );
    socket.to(DISPLAY_ID).emit('front-end-loader', actuator, value, team, token );
  });

  socket.on('dump-truck', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(BBG_ID).emit('dump-truck', actuator, value, team, token );
    socket.to(DISPLAY_ID).emit('dump-truck', actuator, value, team, token );
  });

  socket.on('excavator', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(BBG_ID).emit('excavator', actuator, value, team, token );
    socket.to(DISPLAY_ID).emit('excavator', actuator, value, team, token );
  });

  socket.on('peer-server-id-update', (id) => {
      display_server_id = id;
      console.log('Updated server id: ' + id);
      socket.broadcast.emit('new-peer-server-id', id);
  });

  setInterval(function () { // wait a while then return the peer server id
    if ( display_server_id !== -1 ) {
        socket.emit('new-peer-server-id', display_server_id);
        console.log('updated server id broadcast');
    }
    else {
        console.log('Display not connected');
    }
}, 10000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
