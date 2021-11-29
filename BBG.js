const { io } = require("socket.io-client");

var server = 'https://robot-wars-usyd.herokuapp.com/';
// var server = 'http://localhost:3000';

var socket = io(server);

socket.on("connect", () => {
  console.log('I am the BBG. My socket ID is ' + socket.id); // "G5p5..."
  socket.emit('i-am-the-BBG', socket.id);

  socket.on('front-end-loader', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    // socket.to(BBG_ID).emit('front-end-loader', (actuator, value, team, token ));
  });

  socket.on('dump-truck', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    // socket.to(BBG_ID).emit('dump-truck', (actuator, value, team, token ));
  });

  socket.on('excavator', (actuator, value, team, token ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    // socket.to(BBG_ID).emit('excavator', (actuator, value, team, token ));
  });

});
