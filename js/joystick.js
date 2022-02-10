export function add_joystick(container) {
    var thumb = document.createElement('div');
    var track = document.createElement('div');

    thumb.setAttribute('id','joystick-thumb');
    track.setAttribute('id','joystick-track');

    container.appendChild(track);
    track.appendChild(thumb);


    console.log(container)

    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
    var val = 0;

    var maxDisplacement = container.clientHeight/2./3.;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === thumb) {
        active = true;
      }
    }

    function dragEnd(e) {
        yOffset = 0;
      // initialX = currentX;
      // initialY = currentY;

      active = false;

      setTranslateVertical(0, thumb); // move back to origin
      container.dispatchEvent(stop_event);
      val = 0;
    }

    function drag(e) {
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
          // currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          // currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
        // setTranslate(currentX, currentY, thumb);
        currentY = Math.sign(currentY)*Math.min(Math.abs(currentY),50);

        // xOffset = currentX;
        yOffset = currentY;

        setTranslateVertical(currentY, thumb);

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

    // function setTranslate(xPos, yPos, el) {
    //   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    // }
    function setTranslateVertical(yPos, el) {
      el.style.transform = "translate3d(-50%, " + String(yPos + 33.3333) + "px, 0)";
    }

    let stop_event = new CustomEvent('move', { detail:0 , bubbles: true });
    let up_event = new CustomEvent('move', { detail:1 , bubbles: true });
    let down_event = new CustomEvent('move', { detail:-1 , bubbles: true });

}
