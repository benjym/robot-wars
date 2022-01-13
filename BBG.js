const { io } = require("socket.io-client");
const b = require('bonescript');

["USR0","USR1","USR2","USR3"].forEach(p => b.pinMode(p, b.OUTPUT));  // user selectable LEDs for testing

// enable all possible 65 GPIO pins
// we only need:
//   4 x 6 pins for simple robots (24 pins)
//   2 x 16 pins for excavators (32 pins)
//   total: 56 pins!

for (let i = 3; i <= 46; i++) { // enable entire RHS (44 pins)
   b.pinMode("P8_" + String(i), b.OUTPUT, 7);
}
for (let i = 11; i <= 18; i++) { // enable LHS (8 pins)
   b.pinMode("P9_" + String(i), b.OUTPUT, 7);
}
for (let i = 21; i <= 31; i++) { // enable LHS (11 pins)
   b.pinMode("P9_" + String(i), b.OUTPUT, 7);
}
// and two more pins
b.pinMode("P9_41", b.OUTPUT, 7);
b.pinMode("P9_42", b.OUTPUT, 7);


var server = 'https://robot-wars-usyd.herokuapp.com/'; // production server
// var server = 'http://localhost:3000'; // testing only
var socket = io(server);

socket.on("connect", () => {
  console.log('I am the BBG. My socket ID is ' + socket.id); // "G5p5..."
  socket.emit('i-am-alive', socket.id, 'BBG');

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

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        b.digitalWrite(forward_pin, b.HIGH);
        b.digitalWrite(back_pin,    b.LOW);
    }
    else if (v === -1 ) {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.HIGH);
    }
    else {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.LOW);
    }
  });

  socket.on('dump-truck', (actuator, value, team) => {
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

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        b.digitalWrite(forward_pin, b.HIGH);
        b.digitalWrite(back_pin,    b.LOW);
    }
    else if (v === -1 ) {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.HIGH);
    }
    else {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.LOW);
    }
  });

  socket.on('excavator', (actuator, value, team) => {
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
    else if ( actuator === 'arm_1'        & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'arm_2'        & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'arm_3'        & team === 'a' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'slew'         & team === 'a' ) {
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
    else if ( actuator === 'arm_1'        & team === 'b' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'arm_2'        & team === 'b' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }
    else if ( actuator === 'slew'         & team === 'b' ) {
        var forward_pin = 'USR0';
        var back_pin    = 'USR1';
    }

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        b.digitalWrite(forward_pin, b.HIGH);
        b.digitalWrite(back_pin,    b.LOW);
    }
    else if (v === -1 ) {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.HIGH);
    }
    else {
        b.digitalWrite(forward_pin, b.LOW);
        b.digitalWrite(back_pin,    b.LOW);
    }
  });

});
