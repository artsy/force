(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var KonamiKeyboard = require('konami-keyboard'),
    KonamiTouch = require('konami-touch');

function Konami(success){
    new KonamiKeyboard(success || function(){});
    new KonamiTouch(success || function(){});
}

Konami.prototype.constructor = Konami;

module.exports = Konami;
},{"konami-keyboard":2,"konami-touch":4}],2:[function(require,module,exports){
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
    KeyboardCode = require('keyboard-code');

function KonamiKeyboard(success){
    KeyboardCode.call(this, konamiCode, success || function(){});
}

KonamiKeyboard.prototype = Object.create(KeyboardCode.prototype);
KonamiKeyboard.prototype.constructor = KonamiKeyboard;

module.exports = KonamiKeyboard;
},{"keyboard-code":3}],3:[function(require,module,exports){
function KeyboardCode(code, success){
    this.code = code || [];
    this.success = success || function(){};
    this.codeIndex = 0;

    if(window.addEventListener) {
        window.addEventListener("keyup", this.checkCode.bind(this), false);
    } else {
        window.attachEvent("onkeyup", this.checkCode.bind(this));
    }
}

KeyboardCode.prototype.checkCode = function checkCode(event){
    if(event.keyCode === this.code[this.codeIndex++]){
        if(this.codeIndex === this.code.length){
            this.success();
            this.codeIndex = 0;
        }
    }else{
        this.codeIndex = 0;
    }
};

module.exports = KeyboardCode;
},{}],4:[function(require,module,exports){
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'tap', 'tap', 'tap'],
    GestureDetector = require('gestures'),
    radiansToDegrees = require('math-js/angles/radiansToDegrees'),
    linearRegresion = require('./linearRegresion');

function getGestureVector(moves){
    var line = linearRegresion(moves),
        direction = 0,
        magitude = 0;

    if(line.length>2){
        var startPoint = line[0],
            endPoint = line[line.length - 1];

        direction = radiansToDegrees(Math.atan2(-(startPoint.x - endPoint.x), startPoint.y - endPoint.y));
        magitude = Math.sqrt(Math.pow(Math.abs(startPoint.x - endPoint.x), 2) + Math.pow(Math.abs(startPoint.y - endPoint.y), 2));
    }

    return {
        direction: direction,
        magitude: magitude
    };
}

function KonamiTouch(success){

    this.code = konamiCode;
    this.success = success || function(){};
    this.codeIndex = 0;

    var detector = new GestureDetector();

    detector.gestures.push(function(moves){
        var vector = getGestureVector(moves);

        if(vector.magitude < 5){
            return 'tap';
        }
        if(vector.magitude > 5 && vector.magitude < 20){
            return;
        }

        if(vector.direction > -45 && vector.direction < 45){
            return 'up';
        }
        if(vector.direction < -135 || vector.direction > 135){
            return 'down';
        }
        if(vector.direction < -45 && vector.direction > -135){
            return 'left';
        }
        if(vector.direction > 45 && vector.direction < 135){
            return 'right';
        }
    });

    detector.on('gesture', this.checkCode.bind(this));
}

KonamiTouch.prototype.checkCode = function checkCode(event){
    if(event.name === this.code[this.codeIndex++]){
        if(this.codeIndex === this.code.length){
            this.success();
            this.codeIndex = 0;
        }
    }else{
        this.codeIndex = 0;
    }
};

module.exports = KonamiTouch;

},{"./linearRegresion":5,"gestures":6,"math-js/angles/radiansToDegrees":8}],5:[function(require,module,exports){
module.exports = function linearRegresion(points) {
    var sumX = 0,
        sumY = 0,
        sumXbyY = 0,
        sumXbyX = 0,
        x = 0,
        y = 0,
        numberOfPoints = points.length,
        results = [],
        m,
        b;

    if (numberOfPoints === 0) {
        return [];
    }

    for (var i = 0; i < numberOfPoints; i++) {
        x = points[i].x;
        y = points[i].y;
        sumX += x;
        sumY += y;
        sumXbyX += x*x;
        sumXbyY += x*y;
    }

    m = (numberOfPoints * sumXbyY - sumX * sumY) / (numberOfPoints * sumXbyX - sumX * sumX);
    b = (sumY / numberOfPoints) - (m * sumX) / numberOfPoints;


    for (var i = 0; i < numberOfPoints; i++) {
        results.push({
            x: points[i].x,
            y: points[i].x * m + b
        });
    }

    return results;
}
},{}],6:[function(require,module,exports){
var interact = require('interact-js'),
    EventEmitter = require('events').EventEmitter;

function GestureDetector(target){
    this.target = target || document;

    interact.on('start', this.target, this.__boundStart = this._start.bind(this));

    interact.on('drag', this.target, this.__boundStart = this._drag.bind(this));

    interact.on('end', this.target, this.__boundEnd = this._end.bind(this));

    this.gestures = [];
}
GestureDetector.prototype = Object.create(EventEmitter.prototype);
GestureDetector.prototype.constructor = GestureDetector;
GestureDetector.prototype._start = function(interaction) {
    interaction.points = [];
};
GestureDetector.prototype._drag = function(interaction) {
    interaction.points.push({
        x: interaction.pageX,
        y: interaction.pageY
    });
};
GestureDetector.prototype._end = function(interaction) {
    var detector = this;
    this.gestures.forEach(function(gesture){
        var gestureName = gesture.call(this, interaction.points);
        if(gestureName){
            detector.emit('gesture', {
                name: gestureName,
                points: interaction.points
            });
        }
    });
};
GestureDetector.destroy = function(){
    interact.off('start', this.target, this.__boundStart);

    interact.on('end', this.target, this.__boundEnd);
};

module.exports = GestureDetector;
},{"events":11,"interact-js":7}],7:[function(require,module,exports){
var interactions = [],
    minMoveDistance = 5,
    interact,
    maximumMovesToPersist = 1000, // Should be plenty..
    propertiesToCopy = 'target,pageX,pageY,clientX,clientY,offsetX,offsetY,screenX,screenY,shiftKey,x,y'.split(','); // Stuff that will be on every interaction.

function Interact(){
    this._elements = [];
}
Interact.prototype.on = function(eventName, target, callback){
    if(!target){
        return;
    }
    target._interactEvents = target._interactEvents || {};
    target._interactEvents[eventName] = target._interactEvents[eventName] || []
    target._interactEvents[eventName].push({
        callback: callback,
        interact: this
    });

    return this;
};
Interact.prototype.emit = function(eventName, target, event, interaction){
    if(!target){
        return;
    }

    var interact = this,
        currentTarget = target;

    interaction.originalEvent = event;
    interaction.preventDefault = function(){
        event.preventDefault();
    }
    interaction.stopPropagation = function(){
        event.stopPropagation();
    }

    while(currentTarget){
        currentTarget._interactEvents &&
        currentTarget._interactEvents[eventName] &&
        currentTarget._interactEvents[eventName].forEach(function(listenerInfo){
            if(listenerInfo.interact === interact){
                listenerInfo.callback.call(interaction, interaction);
            }
        });
        currentTarget = currentTarget.parentNode;
    }

    return this;
};
Interact.prototype.off =
Interact.prototype.removeListener = function(eventName, target, callback){
    if(!target || !target._interactEvents || !target._interactEvents[eventName]){
        return;
    }
    var interactListeners = target._interactEvents[eventName],
        listenerInfo;
    for(var i = 0; i < interactListeners.length; i++) {
        listenerInfo = interactListeners[i];
        if(listenerInfo.interact === interact && listenerInfo.callback === callback){
            interactListeners.splice(i,1);
            i--;
        }
    }

    return this;
};
interact = new Interact();

    // For some reason touch browsers never change the event target during a touch.
    // This is, lets face it, fucking stupid.
function getActualTarget() {
    var scrollX = window.scrollX,
        scrollY = window.scrollY;

    // IE is stupid and doesn't support scrollX/Y
    if(scrollX === undefined){
        scrollX = document.body.scrollLeft;
        scrollY = document.body.scrollTop;
    }

    return document.elementFromPoint(this.pageX - window.scrollX, this.pageY - window.scrollY);
}

function getMoveDistance(x1,y1,x2,y2){
    var adj = Math.abs(x1 - x2),
        opp = Math.abs(y1 - y2);

    return Math.sqrt(Math.pow(adj,2) + Math.pow(opp,2));
}

function destroyInteraction(interaction){
    for(var i = 0; i < interactions.length; i++){
        if(interactions[i].identifier === interaction.identifier){
            interactions.splice(i,1);
        }
    }
}

function getInteraction(identifier){
    for(var i = 0; i < interactions.length; i++){
        if(interactions[i].identifier === identifier){
            return interactions[i];
        }
    }
}

function setInheritedData(interaction, data){
    for(var i = 0; i < propertiesToCopy.length; i++) {
        interaction[propertiesToCopy[i]] = data[propertiesToCopy[i]]
    }
}

function Interaction(event, interactionInfo){
    // If there is no event (eg: desktop) just make the identifier undefined
    if(!event){
        event = {};
    }
    // If there is no extra info about the interaction (eg: desktop) just use the event itself
    if(!interactionInfo){
        interactionInfo = event;
    }

    // If there is another interaction with the same ID, something went wrong.
    // KILL IT WITH FIRE!
    var oldInteraction = getInteraction(interactionInfo.identifier);
    oldInteraction && oldInteraction.destroy();

    this.identifier = interactionInfo.identifier;

    this.moves = [];

    interactions.push(this);
}

Interaction.prototype = {
    constructor: Interaction,
    getActualTarget: getActualTarget,
    destroy: function(){
        interact.on('destroy', this.target, this, this);
        destroyInteraction(this);
    },
    start: function(event, interactionInfo){
        // If there is no extra info about the interaction (eg: desktop) just use the event itself
        if(!interactionInfo){
            interactionInfo = event;
        }

        var lastStart = {
                time: new Date()
            };
        setInheritedData(lastStart, interactionInfo);
        this.lastStart = lastStart;

        setInheritedData(this, interactionInfo);

        interact.emit('start', event.target, event, this);
        return this;
    },
    move: function(event, interactionInfo){
        // If there is no extra info about the interaction (eg: desktop) just use the event itself
        if(!interactionInfo){
            interactionInfo = event;
        }

        var currentTouch = {
                time: new Date()
            };

        setInheritedData(currentTouch, interactionInfo);

        // Update the interaction
        setInheritedData(this, interactionInfo);

        this.moves.push(currentTouch);

        // Memory saver, culls any moves that are over the maximum to keep.
        this.moves = this.moves.slice(-maximumMovesToPersist);

        var lastMove = this.moves[this.moves.length-2];
        lastMove && (currentTouch.angle = Math.atan2(currentTouch.pageY - lastMove.pageY, currentTouch.pageX - lastMove.pageX) * 180 / Math.PI);
        this.angle = currentTouch.angle || 0;

        interact.emit('move', event.target, event, this);
        return this;
    },
    drag: function(event, interactionInfo){
        // If there is no extra info about the interaction (eg: desktop) just use the event itself
        if(!interactionInfo){
            interactionInfo = event;
        }

        var currentTouch = {
                time: new Date(),
                isDrag: true
            };

        setInheritedData(currentTouch, interactionInfo);

        // Update the interaction
        setInheritedData(this, interactionInfo);

        if(!this.moves){
            this.moves = [];
        }

        this.moves.push(currentTouch);

        // Memory saver, culls any moves that are over the maximum to keep.
        this.moves = this.moves.slice(-maximumMovesToPersist);

        if(!this.dragStarted && getMoveDistance(this.lastStart.pageX, this.lastStart.pageY, currentTouch.pageX, currentTouch.pageY) > minMoveDistance){
            this.dragStarted = true;
        }

        var lastDrag = this.moves[this.moves.length-2] || this.lastStart;
        lastDrag && (currentTouch.angle = Math.atan2(currentTouch.pageY - lastDrag.pageY, currentTouch.pageX - lastDrag.pageX) * 180 / Math.PI);
        this.angle = currentTouch.angle || 0;

        if(this.dragStarted){
            interact.emit('drag', event.target, event, this);
        }
        return this;
    },
    end: function(event, interactionInfo){
        if(!interactionInfo){
            interactionInfo = event;
        }

        // Update the interaction
        setInheritedData(this, interactionInfo);

        interact.emit('end', event.target, event, this);

        return this;
    },
    cancel: function(event, interactionInfo){
        if(!interactionInfo){
            interactionInfo = event;
        }

        // Update the interaction
        setInheritedData(this, interactionInfo);

        interact.emit('cancel', event.target, event, this);

        return this;
    },
    getMoveDistance: function(){
        if(this.moves.length > 1){
            var current = this.moves[this.moves.length-1],
                previous = this.moves[this.moves.length-2];

            return getMoveDistance(current.pageX, current.pageY, previous.pageX, previous.pageY);
        }
    },
    getMoveDelta: function(){
        if(this.moves.length > 1){
            var current = this.moves[this.moves.length-1],
                previous = this.moves[this.moves.length-2];

            return {
                x: current.pageX - previous.pageX,
                y: current.pageY - previous.pageY
            };
        }
    },
    getSpeed: function(){
        if(this.moves.length > 1){
            var current = this.moves[this.moves.length-1],
                previous = this.moves[this.moves.length-2];

            return this.getMoveDistance() / (current.time - previous.time);
        }
        return 0;
    },
    getCurrentAngle: function(blend){
        var currentPosition,
            lastAngle,
            i = this.moves.length-1,
            angle,
            firstAngle,
            angles = [],
            blendSteps = 20/(this.getSpeed()*2+1),
            stepsUsed = 0;

        if(this.moves && this.moves.length){

            currentPosition = this.moves[i];
            angle = firstAngle = currentPosition.angle;

            if(blend && this.moves.length > 1){
                while(--i > 0 && this.moves.length - i < blendSteps){
                    lastAngle = this.moves[i].angle;
                    if(Math.abs(lastAngle - firstAngle) > 180){
                        angle -= lastAngle
                    }else{
                        angle += lastAngle
                    }
                    stepsUsed++;
                }
                angle = angle/stepsUsed;
            }
        }
        return angle;
    },
    getAllInteractions: function(){
        return interactions.slice();
    }
};

function start(event){
    var touch;

    for(var i = 0; i < event.changedTouches.length; i++){
        touch = event.changedTouches[i];
        new Interaction(event, event.changedTouches[i]).start(event, touch);
    }
}
function drag(event){
    var touch;

    for(var i = 0; i < event.changedTouches.length; i++){
        touch = event.changedTouches[i];
        getInteraction(touch.identifier).drag(event, touch);
    }
}
function end(event){
    var touch;

    for(var i = 0; i < event.changedTouches.length; i++){
        touch = event.changedTouches[i];
        getInteraction(touch.identifier).end(event, touch).destroy();
    }
}
function cancel(event){
    var touch;

    for(var i = 0; i < event.changedTouches.length; i++){
        touch = event.changedTouches[i];
        getInteraction(touch.identifier).cancel(event, touch).destroy();
    }
}

addEvent(document, 'touchstart', start);
addEvent(document, 'touchmove', drag);
addEvent(document, 'touchend', end);
addEvent(document, 'touchcancel', cancel);

var mouseIsDown = false;
addEvent(document, 'mousedown', function(event){
    mouseIsDown = true;
    if(!interactions.length){
        new Interaction(event);
    }
    getInteraction().start(event);
});
addEvent(document, 'mousemove', function(event){
    if(!interactions.length){
        new Interaction(event);
    }
    var interaction = getInteraction();
    if(!interaction){
        return;
    }
    if(mouseIsDown){
        interaction.drag(event);
    }else{
        interaction.move(event);
    }
});
addEvent(document, 'mouseup', function(event){
    mouseIsDown = false;
    var interaction = getInteraction();
    if(!interaction){
        return;
    }
    interaction.end(event, null);
});

function addEvent(element, type, callback) {
    if(element.addEventListener){
        element.addEventListener(type, callback);
    }
    else if(document.attachEvent){
        element.attachEvent("on"+ type, callback);
    }
}

module.exports = interact;
},{}],8:[function(require,module,exports){
var constants = require('../constants');

module.exports = function(radians) {
    return (radians / constants.radiansInACircle) * constants.degreesInACircle;
};
},{"../constants":9}],9:[function(require,module,exports){
var pi = Math.PI;

module.exports = {
    pi: pi,
    degreesInACircle: 360,
    radiansInACircle: 2 * pi
};
},{}],10:[function(require,module,exports){
var Konami = require('../');

new Konami(function(){
    alert('KONAMI!');
});

},{"../":1}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[10])