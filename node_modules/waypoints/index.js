var Emitter = require('events').EventEmitter;
var util = require('util');
var offset = require('offset');
var classes = require('class-list');
var _ = require('underscore');
var each = _.each;
var bind = _.bind;
var throttle = _.throttle;
var events = require('event-component');

/**
 * Waypoints object takes points on the page and binds a scroll event
 * to the window. When these points are reached it will add or remove
 * a class from the element
 */
function Waypoints() {
  this.points = [];
  this._onScroll = throttle(bind(this, this._onScroll), 200);
}

/**
 * Mixin an event emitter so we can emit and bind to events
 */
util.inherits(Waypoints, Emitter);

/**
 * Add a waypoint.
 * @param {Number} point
 * @param {Object} data Any data associated with this point
 */
Waypoints.prototype.addPoint = function(point, data) {
  this.points.push({ y: point, data: data });
};

/**
 * Start the waypoints. Binds events to the window so they waypoints
 * will trigger when they are reached
 */
Waypoints.prototype.start = function() {
  events.bind(window, 'scroll', this._onScroll);
  this._onScroll();
  this.emit('start');
};

/**
 * Method that is fired when scrolling. Checks to see if any of
 * the points is matched and if it is it will add or remove a class
 * from the elment
 */
Waypoints.prototype._onScroll = function() {
  var scrollPoint = window.scrollY || window.pageYOffset;
  var wHeight = window.innerHeight;
  var self = this;
  each(this.points, function(point){
    if( (scrollPoint + wHeight) >= point.y ) {
      self.emit('point', point.y, point.data);
    }
  });
};

/**
 * Disable the waypoints by removing the scroll events
 */
Waypoints.prototype.stop = function() {
  events.unbind(window, 'scroll', this._onScroll);
  this.emit('stop');
};

/**
 * Easy way to setup waypoints on a page. Takes a selector
 * to match points on the page. Then we can use a data-API
 * to create waypoints on the page.
 * @param  {String} selector CSS selector to match elements on the page which will be used as Waypoints
 * @return {Waypoints}
 */
Waypoints.create = function(options) {
  options = options || {};
  var selector = options.selector || '.js-waypoint';
  var addClass = options.addClass || null;
  var removeClass = options.removeClass || null;
  var delay = options.delay || 0;
  var pointOffset = options.offset || 0;

  var waypoints = new Waypoints();
  var matched = document.querySelectorAll(selector);

  each(matched, function(el){
    var y = offset(el).top + Number(el.getAttribute('data-waypoint-offset') || pointOffset);
    waypoints.addPoint(y, {
      el: el,
      addClass: el.getAttribute('data-waypoint-addClass') || addClass,
      removeClass: el.getAttribute('data-waypoint-removeClass') || removeClass,
      delay: Number(el.getAttribute('data-waypoint-delay')) || delay
    });
  });

  waypoints.on('point', function(point, data){
    setTimeout(function(){
      var classList = classes(data.el);
      if(data.addClass) classList.add(data.addClass);
      if(data.removeClass) classList.remove(data.removeClass);
    }, data.delay);
  });

  waypoints.start();
  return waypoints;
};

module.exports = Waypoints;
