(function() {

  // Ignore for unsupported browsers
  if (!window.history && !window.history.pushState) return;

  // If we're inside an iframe modal then send a message to the parent
  // indicating what the iframe's location is so that the parent can decide
  // not to go down a rabbit hole inside the iframe.
  if (parent && parent.postMessage) {
    // postMessage support for IE & other browsers
    if (window.MessageChannel && navigator.userAgent.indexOf('MSIE') > -1) {
      var m = new MessageChannel();
      parent.postMessage({
        href: location.href,
        scrollFrame: true
      }, "*", [m.port2]);
    } else {
      parent.postMessage({
        href: location.href,
        scrollFrame: true
      }, location.origin);
    }
  }

  // When navigating another level deep scrollFrame will refresh the page.
  // Hitting the back button will halt when it gets to the popstate point
  // at which scrollFrame added the iframe modal. This will notice that and
  // make the full refresh instead.
  var firstPopStateTriggered;
  addEventListener('popstate', function(e) {
    if (firstPopStateTriggered && e.state && e.state.scrollFrame &&
        !document.querySelector('.scroll-frame-iframe')) {
      location = e.state.href;
    }
    firstPopStateTriggered = true;
  });
})();