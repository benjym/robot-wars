const { io } = require("socket.io-client");
const b = require('bonescript');
b.pinMode("USR0", b.OUTPUT); // user selectable LED for testing
b.pinMode("USR1", b.OUTPUT); // user selectable LED for testing
b.pinMode("USR2", b.OUTPUT); // user selectable LED for testing
b.pinMode("USR3", b.OUTPUT); // user selectable LED for testing

// enable all possible 65 GPIO pins
// we need:
//   4 x 6 pins for simple robots (24 pins)
//   2 x 16 pins for excavators (32 pins)

for (let i = 3; i <= 46; i++) { // enable entire RHS (44 pins)
   b.pinMode("P8_" + String(i), b.OUTPUT);
}
for (let i = 11; i <= 18; i++) { // enable LHS (8 pins)
   b.pinMode("P9_" + String(i), b.OUTPUT);
}
for (let i = 21; i <= 31; i++) { // enable LHS (11 pins)
   b.pinMode("P9_" + String(i), b.OUTPUT);
}
// and two more pins
b.pinMode("P9_41", b.OUTPUT);
b.pinMode("P9_42", b.OUTPUT);


var server = 'https://robot-wars-usyd.herokuapp.com/';
// var server = 'http://localhost:3000';

var socket = io(server);

socket.on("connect", () => {
  console.log('I am the BBG. My socket ID is ' + socket.id); // "G5p5..."
  socket.emit('i-am-the-BBG', socket.id);

  socket.on('front-end-loader', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);

    if      ( actuator === 'left_wheels'  & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'right_wheels' & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'bucket'       & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'left_wheels'  & team === 'b' ) {
        var forward_pin = 'USR2';
        var back_pin    = 'USR3';
    }
    else if ( actuator === 'right_wheels' & team === 'b' ) {
        var forward_pin = 'USR2';
        var back_pin    = 'USR3';
    }
    else if ( actuator === 'bucket'       & team === 'b' ) {
        var forward_pin = 'USR2';
        var back_pin    = 'USR3';
    }

    if ( value === 1 ) {
        b.digitalWrite(forward_pin, b.HIGH);
        b.digitalWrite(back_pin,    b.LOW);
    }
    else if (value === -1 ) {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.HIGH);
    }
    else {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.LOW);
    }
  });

  socket.on('dump-truck', (actuator, value, team ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
  });

  socket.on('excavator', (actuator, value, team ) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
  });

});
