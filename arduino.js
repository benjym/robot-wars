const { io } = require("socket.io-client");
const { Board, Leds } = require("johnny-five");
const board = new Board();
var leds, forward_pin, back_pin, start_pin;

var server = 'https://robot-wars-usyd.herokuapp.com/'; // production server
// var server = 'http://localhost:3000'; // testing only
var socket = io(server);

board.on("ready", () => {
    let pin_range = [...Array(65).keys()]; // range function in js
    for ( var i=0; i<12; i++ ) {
        pin_range.push('A' + String(i);
        )
    }
    leds = new Leds(pin_range);
    // console.log(leds)
});

var start_pins = {
    'FEL_A': 2,
    'FEL_B': 8,
    'DMP_A': 14,
    'DMP_B': 65, // pin A0
    'EXC_A': 22, // just even pins from here on
    'EXC_B': 23, // just odd pins from here on
}

// 6 pin controller order:
//   1. left wheels forward
//   2. left wheels back
//   3. right weels back
//   4. right weels forward
//   5. bucket up
//   6. bucket down

// OFF COLOUR WIRE IS PIN 1

socket.on("connect", () => {
  console.log('I am the BBG. My socket ID is ' + socket.id); // "G5p5..."
  socket.emit('i-am-alive', 'BBG', socket.id);

  socket.on('FEL', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    if ( team === 'A' ) { start_pin = start_pins['FEL_A'] }
    else { start_pin = start_pins['FEL_B'] }

    if      ( actuator === 'left_wheels' ) {
        forward_pin = leds[start_pin + 0];
        back_pin    = leds[start_pin + 1];
    }
    else if ( actuator === 'right_wheels' ) {
        forward_pin = leds[start_pin + 3];
        back_pin    = leds[start_pin + 2];
    }
    else if ( actuator === 'bucket' ) {
        forward_pin = leds[start_pin + 5];
        back_pin    = leds[start_pin + 4];
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

  socket.on('DMP', (actuator, value, team) => {
      if ( team === 'A' ) { start_pin = start_pins['DMP_A'] }
      else { start_pin = start_pins['DMP_B']}

      if      ( actuator === 'left_wheels' ) {
          forward_pin = leds[start_pin + 0];
          back_pin    = leds[start_pin + 1];
      }
      else if ( actuator === 'right_wheels' ) {
          forward_pin = leds[start_pin + 3];
          back_pin    = leds[start_pin + 2];
      }
      else if ( actuator === 'bucket' ) {
          forward_pin = leds[start_pin + 5];
          back_pin    = leds[start_pin + 4];
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

  socket.on('EXC', (actuator, value, team) => {
    console.log(actuator + ' should be set to ' + value + ' for team ' + team);
    if ( team === 'A' ) { start_pin = start_pins['EXC_A'] }
    else { start_pin = start_pins['EXC_B']}

    if      ( actuator === 'left_wheels' ) {
        forward_pin = leds[start_pin + 0*2];
        back_pin    = leds[start_pin + 1*2];
    }
    else if ( actuator === 'right_wheels' ) {
        forward_pin = leds[start_pin + 3*2];
        back_pin    = leds[start_pin + 2*2];
    }
    else if ( actuator === 'bucket' ) {
        forward_pin = leds[start_pin + 5*2];
        back_pin    = leds[start_pin + 4*2];
    }
    else if ( actuator === 'arm_1' ) {
        forward_pin = leds[start_pin + 6*2];
        back_pin    = leds[start_pin + 7*2];
    }
    else if ( actuator === 'arm_2' ) {
        forward_pin = leds[start_pin + 8*2];
        back_pin    = leds[start_pin + 9*2];
    }
    else if ( actuator === 'slew' ) {
        forward_pin = leds[start_pin + 10*2];
        back_pin    = leds[start_pin + 11*2];
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
