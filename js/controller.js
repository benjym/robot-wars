// var isChromium = window.chrome;
// var winNav = window.navigator;
// var vendorName = winNav.vendor;
// var isOpera = typeof window.opr !== "undefined";
// var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
// var isIOSChrome = winNav.userAgent.match("CriOS");

// if (isIOSChrome) {
//     console.log('You are using Chrome on iOS');
//     document.getElementById('not-chrome').style.display = 'none';
//     screen.orientation.lock('landscape'); // lock phone to landscape if possible
// } else if(
// isChromium !== null &&
// typeof isChromium !== "undefined" &&
// vendorName === "Google Inc." &&
// isOpera === false &&
// isIEedge === false
// ) {
//     console.log('You are using Chrome');
//     screen.orientation.lock('landscape'); // lock phone to landscape if possible
// }
// else {
//     document.getElementById('not-chrome').style.display = 'block';
// }

var left_joystick, right_joystick;
var left_wheels = 0;
var right_wheels = 0;
var socket, peer;
var vehicle, team, token;


export function createEmptyMediaStream() {
    const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
    };

    const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    canvas.getContext('2d').fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
    };

    const audioTrack = createEmptyAudioTrack();
    const videoTrack = createEmptyVideoTrack({ width:640, height:480 });
    const emptyMediaStream = new MediaStream([audioTrack, videoTrack]);

    return emptyMediaStream
}

export function add_two_nipples() {
    var options = {
    zone: document.getElementById('left_wheels'),
    multitouch: true,
    position: {top: '50%', left: '10%'},
    mode: 'static',
    color: '#000',
    restOpacity: 1,
    lockY: true,
    // z-index : 1
    };
    left_joystick = nipplejs.create(options);
    console.log(left_joystick[0])
    options.zone = document.getElementById('right_wheels');
    options.position = {top: '50%', right: '10%'};
    right_joystick = nipplejs.create(options);
}



// show_hide_joysticks();
export function run_servers(v, t, to) {
    vehicle = v; team = t; token = to;

    var server = window.location.protocol + '//' + window.location.host;

   socket = io(server);
   peer = new Peer();

    socket.on('connect', () => {

        socket.on('receive-id', (device, remote_id) => {
          console.log('Received: Device ' + device + ' got ID ' + remote_id);

          peer.on('open', function(id) {
            console.log('Connected to peerJS server... calling ' + remote_id);

            var emptyMediaStream = createEmptyMediaStream();
            var call = peer.call(remote_id, emptyMediaStream);

            call.on('stream', function(remoteStream) {
                console.log('got remote stream');
                console.log('Received response, streaming')
                var video = document.getElementById('background-video');
                video.srcObject = remoteStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            });
          });
        });

        socket.emit('request-id',vehicle+team);

        var left_wheels = document.querySelector("#left_wheels");
        var right_wheels = document.querySelector("#right_wheels");
        left_wheels.addEventListener('move', (e) => {
            socket.emit(vehicle, 'left_wheels', e.detail, team, token);
        });
        right_wheels.addEventListener('move', (e) => {
            socket.emit(vehicle, 'right_wheels', e.detail, team, token);
        });
        // left_joystick.on('move', (evt, data) => {
        //     console.log(data)
        //   if ( Math.abs( data.vector.y ) > 0.5 ) {
        //       if ( left_wheels !== Math.sign(data.vector.y) ) {
        //          left_wheels = Math.sign(data.vector.y);
        //          // console.log(left_wheels);
        //          socket.emit(vehicle, 'left_wheels', left_wheels, team, token);
        //      }
        //  }
        // });
        //
        // left_joystick.on('end', (evt, data) => {
        //   left_wheels = 0;
        //   socket.emit(vehicle, 'left_wheels', left_wheels, team, token);
        // });
        //
        // right_joystick.on('move', (evt, data) => {
        //   if ( Math.abs( data.vector.y ) > 0.5 ) {
        //       if ( right_wheels !== Math.sign(data.vector.y) ) {
        //          right_wheels = Math.sign(data.vector.y);
        //          // console.log(right_wheels);
        //          socket.emit(vehicle, 'right_wheels', right_wheels, team, token);
        //      }
        //  }
        // });
        //
        // right_joystick.on('end', () => {
        //   right_wheels = 0;
        //   socket.emit(vehicle, 'right_wheels', right_wheels, team, token);
        // });

    });
}

export function add_control_pair(up_tag, down_tag, name) {
    function update_value(value) {
        console.log(name + ' ' + String(value));
        socket.emit(vehicle, name, value, team, token);
    }

    function go_up() {
        update_value(1);
    }

    function go_down() {
        update_value(-1);
    }

    function stop() {
        update_value(0);
    }

    up_tag.ontouchend       = stop;
    up_tag.ontouchcancel    = stop;
    up_tag.onkeyup          = stop;
    up_tag.onmouseup        = stop;

    up_tag.ontouchstart     = go_up;
    up_tag.onkeydown        = go_up;
    up_tag.onmousedown      = go_up;

    down_tag.ontouchend     = stop;
    down_tag.ontouchcancel  = stop;
    down_tag.onkeyup        = stop;
    down_tag.onmouseup      = stop;

    down_tag.ontouchstart   = go_down;
    down_tag.onkeydown      = go_down;
    down_tag.onmousedown    = go_down;
}



export function actuateViaKeyboard(e) {
if ( !event.repeat ) {
  if ( e.code == 'KeyQ' ) { socket.emit(vehicle, 'left_wheels', 1, team, token); }
  else if ( e.code == 'KeyA' ) { socket.emit(vehicle, 'left_wheels', -1, team, token); }
  else if ( e.code == 'KeyW' ) { socket.emit(vehicle, 'bucket', 1, team, token); }
  else if ( e.code == 'KeyS' ) { socket.emit(vehicle, 'bucket', -1, team, token); }
  else if ( e.code == 'KeyE' ) { socket.emit(vehicle, 'right_wheels', 1, team, token); }
  else if ( e.code == 'KeyD' ) { socket.emit(vehicle, 'right_wheels', -1, team, token); }
}
}

export function deactuateViaKeyboard(e) {
if ( e.code == 'KeyQ' ) { socket.emit(vehicle, 'left_wheels', 0, team, token); }
else if ( e.code == 'KeyA' ) { socket.emit(vehicle, 'left_wheels', 0, team, token); }
else if ( e.code == 'KeyW' ) { socket.emit(vehicle, 'bucket', 0, team, token); }
else if ( e.code == 'KeyS' ) { socket.emit(vehicle, 'bucket', 0, team, token); }
else if ( e.code == 'KeyE' ) { socket.emit(vehicle, 'right_wheels', 0, team, token); }
else if ( e.code == 'KeyD' ) { socket.emit(vehicle, 'right_wheels', 0, team, token); }
}
