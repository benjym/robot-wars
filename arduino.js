const { io } = require("socket.io-client");
const { Board, Leds } = require("johnny-five");
const board = new Board();
var leds, forward_pin, back_pin;

var server = 'https://robot-wars-usyd.herokuapp.com/'; // production server
// var server = 'http://localhost:3000'; // testing only
var socket = io(server);

board.on("ready", () => {
    let pin_range = [...Array(65).keys()]; // range function in js
    leds = new Leds(pin_range);
    // console.log(leds)
});

var start_pins = {
    'FEL_A': 2,
    'FEL_B': 8,
    'DMP_A': 14,
    'DMP_B': 20,
    'EXC_A': 26,
    'EXC_B': 38
}

// 6 pin controller order:
//   1. right wheels back
//   2. right wheels forward
//   3. bucket down
//   4. bucket up
//   5. left wheels forward
//   6. left wheels back

socket.on("connect", () => {
  console.log('I am the BBG. My socket ID is ' + socket.id); // "G5p5..."
  socket.emit('i-am-alive', socket.id, 'BBG');

  socket.on('front-end-loader', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);

    if      ( actuator === 'left_wheels'  & team === 'a' ) {
        forward_pin = leds[start_pins['FEL_A'] + 4];
        back_pin    = leds[start_pins['FEL_A'] + 5];
    }
    else if ( actuator === 'right_wheels' & team === 'a' ) {
        forward_pin = leds[start_pins['FEL_A'] + 1];
        back_pin    = leds[start_pins['FEL_A']];
    }
    else if ( actuator === 'bucket'       & team === 'a' ) {
        forward_pin = leds[start_pins['FEL_A'] + 3];
        back_pin    = leds[start_pins['FEL_A'] + 2];
    }
    else if  ( actuator === 'left_wheels'  & team === 'b' ) {
        forward_pin = leds[start_pins['FEL_B'] + 4];
        back_pin    = leds[start_pins['FEL_B'] + 5];
    }
    else if ( actuator === 'right_wheels' & team === 'b' ) {
        forward_pin = leds[start_pins['FEL_B'] + 1];
        back_pin    = leds[start_pins['FEL_B']];
    }
    else if ( actuator === 'bucket'       & team === 'b' ) {
        forward_pin = leds[start_pins['FEL_B'] + 3];
        back_pin    = leds[start_pins['FEL_B'] + 2];
    }

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        forward_pin.on();
        back_pin.off();
    }
    else if (v === -1 ) {
        forward_pin.off();
        back_pin.on();
    }
    else {
        forward_pin.off();
        back_pin.off();
    }
  });

  socket.on('dump-truck', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);

    if      ( actuator === 'left_wheels'  & team === 'a' ) {
        forward_pin = leds[start_pins['DMP_A'] + 4];
        back_pin    = leds[start_pins['DMP_A'] + 5];
    }
    else if ( actuator === 'right_wheels' & team === 'a' ) {
        forward_pin = leds[start_pins['DMP_A'] + 1];
        back_pin    = leds[start_pins['DMP_A']];
    }
    else if ( actuator === 'bucket'       & team === 'a' ) {
        forward_pin = leds[start_pins['DMP_A'] + 3];
        back_pin    = leds[start_pins['DMP_A'] + 2];
    }
    else if  ( actuator === 'left_wheels'  & team === 'b' ) {
        forward_pin = leds[start_pins['DMP_B'] + 4];
        back_pin    = leds[start_pins['DMP_B'] + 5];
    }
    else if ( actuator === 'right_wheels' & team === 'b' ) {
        forward_pin = leds[start_pins['DMP_B'] + 1];
        back_pin    = leds[start_pins['DMP_B']];
    }
    else if ( actuator === 'bucket'       & team === 'b' ) {
        forward_pin = leds[start_pins['DMP_B'] + 3];
        back_pin    = leds[start_pins['DMP_B'] + 2];
    }

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        forward_pin.on();
        back_pin.off();
    }
    else if (v === -1 ) {
        forward_pin.off();
        back_pin.on();
    }
    else {
        forward_pin.off();
        back_pin.off();
    }
  });

  socket.on('excavator', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);

    if      ( actuator === 'left_wheels'  & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A']];
        back_pin    = leds[start_pins['EXC_A'] + 1];
    }
    else if ( actuator === 'right_wheels' & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A'] + 2];
        back_pin    = leds[start_pins['EXC_A'] + 3];
    }
    else if ( actuator === 'bucket'       & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A'] + 4];
        back_pin    = leds[start_pins['EXC_A'] + 5];
    }
    else if ( actuator === 'arm_1'        & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A'] + 6];
        back_pin    = leds[start_pins['EXC_A'] + 7];
    }
    else if ( actuator === 'arm_2'        & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A'] + 8];
        back_pin    = leds[start_pins['EXC_A'] + 9];
    }
    else if ( actuator === 'slew'         & team === 'a' ) {
        forward_pin = leds[start_pins['EXC_A'] + 10];
        back_pin    = leds[start_pins['EXC_A'] + 11];
    }

    else if ( actuator === 'left_wheels'  & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B']];
        back_pin    = leds[start_pins['EXC_B'] + 1];
    }
    else if ( actuator === 'right_wheels' & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B'] + 2];
        back_pin    = leds[start_pins['EXC_B'] + 3];
    }
    else if ( actuator === 'bucket'       & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B'] + 4];
        back_pin    = leds[start_pins['EXC_B'] + 5];
    }
    else if ( actuator === 'arm_1'        & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B'] + 6];
        back_pin    = leds[start_pins['EXC_B'] + 7];
    }
    else if ( actuator === 'arm_2'        & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B'] + 8];
        back_pin    = leds[start_pins['EXC_B'] + 9];
    }
    else if ( actuator === 'slew'         & team === 'b' ) {
        forward_pin = leds[start_pins['EXC_B'] + 10];
        back_pin    = leds[start_pins['EXC_B'] + 11];
    }

    v = parseInt(value); // just to be sure
    if ( v === 1 ) {
        forward_pin.on();
        back_pin.off();
    }
    else if (v === -1 ) {
        forward_pin.off();
        back_pin.on();
    }
    else {
        forward_pin.off();
        back_pin.off();
    }
  });

});
