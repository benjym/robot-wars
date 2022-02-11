export function add_joystick(container) {
    var thumb = document.createElement('div');
    var track = document.createElement('div');

    thumb.setAttribute('class','joystick-thumb');
    thumb.setAttribute('id', Math.random())
    track.setAttribute('class','joystick-track');

    container.appendChild(track);
    track.appendChild(thumb);

    var active = false;
    var currentY;
    var initialY;
    var val = 0;

    var benjyOffset = container.clientHeight/2 - 40; // to get the thumb in the middle of the track
    var maxDisplacement = container.clientHeight/2.; // half-length of track

    setTranslate(0, thumb); // put the thumb in the middle

    function update_orientation() {
        var afterOrientationChange = function() { // NOTE: need an extra step to get the new dimensions _AFTER_ rotation
            benjyOffset = container.clientHeight/2 - 40;
            maxDisplacement = container.clientHeight/2.;
            setTranslate(0, thumb); // move back to origin
            // Remove the resize event listener after it has executed
            window.removeEventListener('resize', afterOrientationChange);
        };
        window.addEventListener('resize', afterOrientationChange);
    }

    if ( screen.orientation === undefined ) { // beautiful iOS not supporting the standard
        console.log(window.orientation)
        window.addEventListener('orientationchange', () => {
            console.log('iOS orientation changed');
            update_orientation();
        });
    }
    else {
        screen.orientation.addEventListener('change', () => {
            console.log('non-iOS orientation changed')
            update_orientation();
        });
    }

    thumb.addEventListener("touchstart", dragStart, false);
    thumb.addEventListener("touchend", dragEnd, false);
    thumb.addEventListener("touchmove", drag, false);

    thumb.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false); // mouse could be anywhere when it releases
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        if ( e.target === thumb ) {
            if (e.type === "touchstart") {
                for ( var i=0; i<e.touches.length; i++ ) {
                    initialY = e.touches[i].clientY;
                }
            } else {
                initialY = e.clientY;
            }

            active = true;
            e.target.setAttribute('data-active', '');
        }
    }

    function dragEnd(e) {
        if ( e.target === thumb ) {
            active = false;
            e.target.removeAttribute('data-active');

            setTranslate(0, thumb); // move back to origin

            if ( val !== 0 ) {
                container.dispatchEvent(stop_event);
                val = 0;
            }
        }
    }

    function drag(e) {
        if ( active ) {

            e.preventDefault();
            if (e.type === "touchmove") {
                for ( var i=0; i<e.touches.length; i++ ) {
                    if ( e.touches[i].target === thumb ) {
                        currentY = e.touches[i].clientY - initialY;
                    }
                }
            } else {
                currentY = e.clientY - initialY;
            }

            currentY = Math.sign(currentY)*Math.min(Math.abs(currentY),maxDisplacement);

            setTranslate(currentY, thumb);

            if ( currentY/maxDisplacement > 0.5 && val !== -1) {
                container.dispatchEvent(down_event);
                val = -1;
            } else if ( currentY/maxDisplacement  < -0.5 && val !== 1) {
                container.dispatchEvent(up_event);
                val = 1;
            } else if (Math.abs(currentY/maxDisplacement) < 0.5 && val !== 0 ) {
                container.dispatchEvent(stop_event);
                val = 0;
            }
        }
    }

    function setTranslate(yPos, el) {
        el.style.transform = "translate(-50%, " + String(yPos + benjyOffset) + "px)";
    }

    let stop_event = new CustomEvent('move', { detail: 0 , bubbles: true });
    let up_event   = new CustomEvent('move', { detail: 1 , bubbles: true });
    let down_event = new CustomEvent('move', { detail:-1 , bubbles: true });

}
