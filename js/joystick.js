export function add_joystick(container) {
    var thumb = document.createElement('div');
    var track = document.createElement('div');

    thumb.setAttribute('id','joystick-thumb');
    track.setAttribute('id','joystick-track');

    container.appendChild(track);
    track.appendChild(thumb);

    var active = false;
    var currentY;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
    var val = 0;
    var finger;

    console.log(container.clientHeight);
    var benjyOffset = container.clientHeight/2 - 40;
    var maxDisplacement = container.clientHeight/2.;

    setTranslate(0, thumb)

    screen.orientation.addEventListener('change', () => {
        // After orientationchange, add a one-time resize event
        var afterOrientationChange = function() { // NOTE: need an extra step to get the new dimensions _AFTER_ rotation
            benjyOffset = container.clientHeight/2 - 40;
            maxDisplacement = container.clientHeight/2.;
            setTranslate(0, thumb); // move back to origin
            // Remove the resize event listener after it has executed
            window.removeEventListener('resize', afterOrientationChange);
        };
        window.addEventListener('resize', afterOrientationChange);
    });

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false); // mouse could be anywhere when it releases
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.type === "touchstart") {
        finger = e.changedTouches[e.changedTouches.length - 1].identifier
        initialY = e.touches[finger].clientY - yOffset;
      } else {
        initialY = e.clientY - yOffset;
      }

      if (e.target === thumb) {
        active = true;
      }
    }

    function dragEnd(e) {
      yOffset = 0;
      active = false;

      setTranslate(0, thumb); // move back to origin
      if ( val !== 0 ) {
          container.dispatchEvent(stop_event);
          val = 0;
          finger = null;
      }
    }

    function drag(e) {
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            for (var i=0; i < e.changedTouches.length; i++) {
                if ( e.changedTouches[i].identifier === finger ) {
                    currentY = e.touches[finger].clientY - initialY;
                }
            }
        } else {
          currentY = e.clientY - initialY;
        }

        currentY = Math.sign(currentY)*Math.min(Math.abs(currentY),maxDisplacement);
        yOffset = currentY;

        setTranslate(currentY, thumb);

        if ( yOffset/maxDisplacement > 0.5 && val !== -1) {
            container.dispatchEvent(down_event);
            val = -1;
        }
        else if ( yOffset/maxDisplacement  < -0.5 && val !== 1) {
            container.dispatchEvent(up_event);
            val = 1;
        }
      }
    }

    function setTranslate(yPos, el) {
      el.style.transform = "translate(-50%, " + String(yPos + benjyOffset) + "px)";
    }

    let stop_event = new CustomEvent('move', { detail:0 , bubbles: true });
    let up_event = new CustomEvent('move', { detail:1 , bubbles: true });
    let down_event = new CustomEvent('move', { detail:-1 , bubbles: true });

}
