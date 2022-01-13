const express = require("express");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

var IDs = {
    'BBG': 0,
    'DISPLAY': 0,
    'DMPA': 0,
    'DMPB': 0,
    'FELA': 0,
    'FELB': 0,
    'EXCA': 0,
    'EXCB': 0,
    'DISPLAY_peerJS': 0,
    'DMPA_peerJS_controller': 0,
    'DMPB_peerJS_controller': 0,
    'FELA_peerJS_controller': 0,
    'FELB_peerJS_controller': 0,
    'EXCA_peerJS_controller': 0,
    'EXCB_peerJS_controller': 0,
};

const port = process.env.PORT || 3000;
var display_peerJS_id = -1;

app.use('/', express.static(__dirname + '/')); // serve data files

io.on('connection', (socket) => { // when a user connects
  console.log('a user connected');

  socket.on('i-am-alive', (device, id) => {
      console.log('The ' + device + ' connected with id ' + id)
      IDs[device] = id;
  });

  socket.on('request-id', (device) => {
      console.log(device, IDs[device])
      if ( IDs[device] !== 0 ) {
          console.log('sent for ' + device)
          socket.emit('receive-id', device, IDs[device]);
      }
  });

  // socket.on('i-am-the-DISPLAY', id => {
  //     console.log('The DISPLAY connected with socket id ' + id)
  //     DISPLAY_ID = id;
  // });

  socket.on('front-end-loader', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(IDs['BBG']).emit('front-end-loader', actuator, value, team, token );
    socket.to(IDs['DISPLAY']).emit('front-end-loader', actuator, value, team, token );
  });

  socket.on('dump-truck', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(IDs['BBG']).emit('dump-truck', actuator, value, team, token );
    socket.to(IDs['DISPLAY']).emit('dump-truck', actuator, value, team, token );
  });

  socket.on('excavator', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    socket.to(IDs['BBG']).emit('excavator', actuator, value, team, token );
    socket.to(IDs['DISPLAY']).emit('excavator', actuator, value, team, token );
  });

  // socket.on('peer-server-id-update', (id) => {
  //     display_peerJS_id = id;
  //     console.log('Updated server id: ' + id);
  //     socket.broadcast.emit('receive-id', 'display_peerJS', id);
  // });

//   setInterval(function () { // wait a while then return the peer server id
//     if ( display_server_id !== -1 ) {
//         socket.emit('new-peer-server-id', display_server_id);
//         console.log('updated server id broadcast');
//     }
//     else {
//         console.log('Display not connected');
//     }
// }, 10000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
