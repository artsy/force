export const scrollTo = (element, target, duration) => {
  target = Math.round(target);
  duration = Math.round(duration);
  // invalid duration
  if (duration < 0) { return; }
  // instant scroll
  if (duration === 0) {
    element.scrollTop = target;
    return;
  }

  var startTime = Date.now();
  var endTime = startTime + duration;

  var startTop = element.scrollTop;
  var distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  var smoothStep = function(start, end, point) {
    if(point <= start) { return 0; }
    if(point >= end) { return 1; }
    var x = (point - start) / (end - start); // interpolation
    return x*x*(3 - 2*x);
  }

  var previousTop = element.scrollTop;

  var scrollFrame = function() {
    // animation was interrupted by other actions
    if(element.scrollTop != previousTop) { return; }

    // set the scrollTop for this frame
    var now = Date.now();
    var point = smoothStep(startTime, endTime, now);
    var frameTop = Math.round(startTop + (distance * point));
    element.scrollTop = frameTop;

    // check if we're done!
    if(now >= endTime) { return; }

    // If we were supposed to scroll but didn't, then we
    // probably hit the limit, so consider it done;
    if(element.scrollTop === previousTop && element.scrollTop !== frameTop) { return; }

    previousTop = element.scrollTop;

    // schedule next frame for execution
    setTimeout(scrollFrame, 0);
  }

  // start the animation process
  scrollFrame();
}
