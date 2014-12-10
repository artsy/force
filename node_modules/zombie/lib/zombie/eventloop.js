var Domain, EventEmitter, EventLoop, EventQueue, Interval, Lazybird, Promise, Timeout, ms,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Domain = require("domain");

EventEmitter = require("events").EventEmitter;

ms = require("ms");

Promise = require("bluebird").Promise;

Lazybird = require("lazybird");

EventLoop = (function(_super) {
  __extends(EventLoop, _super);

  function EventLoop(browser) {
    this.browser = browser;
    this.active = null;
    this.expected = 0;
    this.running = false;
    this.waiting = 0;
    this.on("error", (function(_this) {
      return function(error) {
        return _this.browser.emit("error", error);
      };
    })(this));
  }

  EventLoop.prototype.wait = function(waitDuration, completionFunction) {
    var lazy, timeoutOn;
    waitDuration = ms(waitDuration.toString()) || this.browser.waitDuration;
    timeoutOn = Date.now() + waitDuration;
    lazy = new Lazybird((function(_this) {
      return function(resolve, reject) {
        var finalized, ondone, onerror, ontick, timer, work;
        ++_this.waiting;
        if (_this.waiting === 1) {
          setImmediate(function() {
            if (_this.active) {
              return _this.run();
            }
          });
        }
        timer = null;
        ontick = null;
        onerror = null;
        ondone = null;
        work = new Promise(function(resolve, reject) {
          timer = global.setTimeout(resolve, waitDuration);
          ontick = function(next) {
            var completed, error, waitFor;
            if (next >= timeoutOn) {
              resolve();
            } else if (completionFunction && _this.active.document.documentElement) {
              try {
                waitFor = Math.max(next - Date.now(), 0);
                completed = completionFunction(_this.active, waitFor);
                if (completed) {
                  resolve();
                }
              } catch (_error) {
                error = _error;
                reject(error);
              }
            }
          };
          _this.on("tick", ontick);
          ondone = resolve;
          _this.once("done", ondone);
          onerror = reject;
          _this.browser.once("error", onerror);
        });
        finalized = work["finally"](function() {
          clearInterval(timer);
          _this.removeListener("tick", ontick);
          _this.removeListener("done", ondone);
          _this.browser.removeListener("error", onerror);
          --_this.waiting;
          if (_this.waiting === 0) {
            _this.browser.emit("done");
          }
        });
        return resolve(finalized);
      };
    })(this));
    return lazy;
  };

  EventLoop.prototype.dump = function() {
    return [];
  };

  EventLoop.prototype.createEventQueue = function(window) {
    return new EventQueue(window);
  };

  EventLoop.prototype.setActiveWindow = function(window) {
    if (window === this.active) {
      return;
    }
    this.active = window;
    if (this.active) {
      return this.run();
    }
  };

  EventLoop.prototype.expecting = function() {
    var done;
    ++this.expected;
    done = (function(_this) {
      return function() {
        --_this.expected;
        _this.run();
      };
    })(this);
    return done;
  };

  EventLoop.prototype.next = function(fn) {
    ++this.expected;
    return setImmediate((function(_this) {
      return function() {
        var error;
        --_this.expected;
        try {
          fn();
          return _this.run();
        } catch (_error) {
          error = _error;
          return _this.emit("error", error);
        }
      };
    })(this));
  };

  EventLoop.prototype.run = function() {
    if (this.running) {
      return;
    }
    if (this.waiting === 0) {
      return;
    }
    if (!this.active) {
      this.emit("done");
      return;
    }
    this.running = true;
    setImmediate((function(_this) {
      return function() {
        var error, fn, nextTick;
        _this.running = false;
        if (!_this.active) {
          _this.emit("done");
          return;
        }
        try {
          if (fn = _this.active._eventQueue.dequeue()) {
            try {
              fn();
              _this.emit("tick", 0);
              return _this.run();
            } catch (_error) {
              error = _error;
              return _this.emit("error", error);
            }
          } else if (_this.expected > 0) {
            return _this.emit("tick", 0);
          } else {
            nextTick = _this.active._eventQueue.next();
            return _this.emit("tick", nextTick);
          }
        } catch (_error) {
          error = _error;
          return _this.emit("error", error);
        }
      };
    })(this));
  };

  return EventLoop;

})(EventEmitter);

EventQueue = (function() {
  function EventQueue(window) {
    this.window = window;
    this.browser = this.window.browser;
    this.eventLoop = this.browser.eventLoop;
    this.queue = [];
    this.expecting = [];
    this.timers = [];
    this.eventSources = [];
    this.nextTimerHandle = 1;
  }

  EventQueue.prototype.destroy = function() {
    var eventSource, expecting, timer, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    _ref = this.timers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      timer = _ref[_i];
      if (timer) {
        timer.stop();
      }
    }
    _ref1 = this.expecting;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      expecting = _ref1[_j];
      expecting();
    }
    _ref2 = this.eventSources;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      eventSource = _ref2[_k];
      if (eventSource) {
        eventSource.close();
      }
    }
    return this.timers = this.queue = this.expecting = this.eventSources = null;
  };

  EventQueue.prototype.enqueue = function(fn) {
    if (!this.queue) {
      throw new Error("This browser has been destroyed");
    }
    if (fn) {
      this.queue.push(fn);
      this.eventLoop.run();
    }
  };

  EventQueue.prototype.dequeue = function() {
    var fn, frame, _i, _len, _ref;
    if (!this.queue) {
      return;
    }
    if (fn = this.queue.shift()) {
      return fn;
    }
    _ref = this.window.frames;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      frame = _ref[_i];
      if (fn = frame._eventQueue.dequeue()) {
        return fn;
      }
    }
  };

  EventQueue.prototype.http = function(method, url, options, callback) {
    var done;
    if (!this.queue) {
      return;
    }
    done = this.eventLoop.expecting();
    this.expecting.push(done);
    this.browser.resources.request(method, url, options, (function(_this) {
      return function(error, response) {
        if (_this.queue) {
          if (response && response.statusCode >= 400) {
            error = new Error("Server returned status code " + response.statusCode + " from " + url);
          }
          _this.enqueue(function() {
            callback(error, response);
            if (error) {
              return _this.browser.emit("error", error);
            }
          });
        }
        if (_this.expecting) {
          _this.expecting.splice(_this.expecting.indexOf(done), 1);
          return done();
        }
      };
    })(this));
  };

  EventQueue.prototype.onerror = function(error) {
    var event;
    this.window.console.error(error);
    this.browser.emit("error", error);
    event = this.window.document.createEvent("Event");
    event.initEvent("error", false, false);
    event.message = error.message;
    event.error = error;
    return this.window.dispatchEvent(event);
  };

  EventQueue.prototype.addEventSource = function(eventSource) {
    var emit;
    if (!this.eventSources) {
      throw new Error("This browser has been destroyed");
    }
    this.eventSources.push(eventSource);
    emit = eventSource.emit;
    return eventSource.emit = (function(_this) {
      return function() {
        var args;
        args = arguments;
        _this.eventLoop.emit("server");
        return _this.enqueue(function() {
          return emit.apply(eventSource, args);
        });
      };
    })(this);
  };

  EventQueue.prototype.setTimeout = function(fn, delay) {
    var handle, remove;
    if (delay == null) {
      delay = 0;
    }
    if (!this.timers) {
      throw new Error("This browser has been destroyed");
    }
    if (!fn) {
      return;
    }
    handle = this.nextTimerHandle;
    ++this.nextTimerHandle;
    remove = (function(_this) {
      return function() {
        return delete _this.timers[handle];
      };
    })(this);
    this.timers[handle] = new Timeout(this, fn, delay, remove);
    return handle;
  };

  EventQueue.prototype.clearTimeout = function(handle) {
    var timer;
    if (!this.timers) {
      throw new Error("This browser has been destroyed");
    }
    timer = this.timers[handle];
    if (timer) {
      timer.stop();
    }
  };

  EventQueue.prototype.setInterval = function(fn, interval) {
    var handle, remove;
    if (interval == null) {
      interval = 0;
    }
    if (!this.timers) {
      throw new Error("This browser has been destroyed");
    }
    if (!fn) {
      return;
    }
    handle = this.nextTimerHandle;
    ++this.nextTimerHandle;
    remove = (function(_this) {
      return function() {
        return delete _this.timers[handle];
      };
    })(this);
    this.timers[handle] = new Interval(this, fn, interval, remove);
    return handle;
  };

  EventQueue.prototype.clearInterval = function(handle) {
    var timer;
    if (!this.timers) {
      throw new Error("This browser has been destroyed");
    }
    timer = this.timers[handle];
    if (timer) {
      timer.stop();
    }
  };

  EventQueue.prototype.next = function() {
    var frame, frameNext, next, timer, _i, _j, _len, _len1, _ref, _ref1;
    next = Infinity;
    _ref = this.timers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      timer = _ref[_i];
      if (timer && timer.next < next) {
        next = timer.next;
      }
    }
    _ref1 = this.window.frames;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      frame = _ref1[_j];
      frameNext = frame._eventQueue.next();
      if (frameNext < next) {
        next = frameNext;
      }
    }
    return next;
  };

  return EventQueue;

})();

Timeout = (function() {
  function Timeout(queue, fn, delay, remove) {
    var fire;
    this.queue = queue;
    this.fn = fn;
    this.delay = delay;
    this.remove = remove;
    this.delay = Math.max(this.delay || 0, 0);
    fire = (function(_this) {
      return function() {
        _this.queue.enqueue(function() {
          var error;
          _this.queue.browser.emit("timeout", _this.fn, _this.delay);
          try {
            return _this.queue.window._evaluate(_this.fn);
          } catch (_error) {
            error = _error;
            return _this.queue.browser.emit("error", error);
          }
        });
        return _this.remove();
      };
    })(this);
    this.handle = global.setTimeout(fire, this.delay);
    this.next = Date.now() + this.delay;
  }

  Timeout.prototype.stop = function() {
    global.clearTimeout(this.handle);
    return this.remove();
  };

  return Timeout;

})();

Interval = (function() {
  function Interval(queue, fn, interval, remove) {
    var fire, pendingEvent;
    this.queue = queue;
    this.fn = fn;
    this.interval = interval;
    this.remove = remove;
    this.interval = Math.max(this.interval || 0);
    pendingEvent = false;
    fire = (function(_this) {
      return function() {
        _this.next = Date.now() + _this.interval;
        if (pendingEvent) {
          return;
        }
        pendingEvent = true;
        return _this.queue.enqueue(function() {
          var error;
          pendingEvent = false;
          _this.queue.browser.emit("interval", _this.fn, _this.interval);
          try {
            return _this.queue.window._evaluate(_this.fn);
          } catch (_error) {
            error = _error;
            return _this.queue.browser.emit("error", error);
          }
        });
      };
    })(this);
    this.handle = global.setInterval(fire, this.interval);
    this.next = Date.now() + this.interval;
  }

  Interval.prototype.stop = function() {
    global.clearInterval(this.handle);
    return this.remove();
  };

  return Interval;

})();

module.exports = EventLoop;
