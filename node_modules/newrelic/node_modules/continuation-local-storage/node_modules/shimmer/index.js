'use strict';

function isFunction(funktion) {
  return funktion && {}.toString.call(funktion) === '[object Function]';
}

// Default to complaining loudly when things don't go according to plan.
var logger = console.error.bind(console);

// Keep initialization idempotent.
function shimmer(options) {
  if (options && options.logger) {
    if (!isFunction(options.logger)) logger("new logger isn't a function, not replacing");
    else logger = options.logger;
  }
}

function wrap(nodule, name, wrapper) {
  if (!nodule || !nodule[name]) {
    logger("no original function " + name + " to wrap");
    return;
  }

  if (!wrapper) {
    logger("no wrapper function");
    logger((new Error()).stack);
    return;
  }

  if (!isFunction(nodule[name]) || !isFunction(wrapper)) {
    logger("original object and wrapper must be functions");
    return;
  }

  var original = nodule[name]
    , wrapped = wrapper(original)
    ;

  wrapped.__original = original;
  wrapped.__unwrap = function () {
    if (nodule[name] === wrapped) nodule[name] = original;
  };
  wrapped.__wrapped = true;

  nodule[name] = wrapped;

  return wrapped;
}

function massWrap(nodules, names, wrapper) {
  if (!nodules) {
    logger("must provide one or more modules to patch");
    logger((new Error()).stack);
    return;
  } else if (!Array.isArray(nodules)) {
    nodules = [nodules];
  }

  if (!(names && Array.isArray(names))) {
    logger("must provide one or more functions to wrap on modules");
    return;
  }

  nodules.forEach(function (nodule) {
    names.forEach(function (name) {
      wrap(nodule, name, wrapper);
    });
  });
}

function unwrap(nodule, name) {
  if (!nodule || !nodule[name]) {
    logger("no function to unwrap.");
    logger((new Error()).stack);
    return;
  }

  if (!nodule[name].__unwrap) {
    logger("no original to unwrap to -- has " + name + " already been unwrapped?");
  }
  else {
    return nodule[name].__unwrap();
  }
}

function wrapEmitter(emitter, onAddListener, onEmit) {
  if (!emitter || !emitter.on || !emitter.addListener ||
      !emitter.removeListener || !emitter.emit) {
    logger("can only wrap real EEs");
    return;
  }

  if (!onAddListener) {
    logger("must have function to run when adding a new listener");
    return;
  }

  if (!onEmit) {
    logger("must have function to wrap listeners when emitting");
    return;
  }

  // dunderscores are boring
  var SYMBOL = 'wrap@before';

  /* Attach a context to a listener, and make sure that this hook stays
   * attached to the emitter forevermore.
   */
  function adding(on) {
    return function added(event, listener) {
      // set up the listener so that onEmit can do whatever it needs
      var before = this[SYMBOL];
      if (typeof before === 'function') {
        before(listener);
      }
      else if (Array.isArray(before)) {
        var length = before.length;
        for (var i = 0; i < length; i++) {
          before[i](listener);
        }
      }

      try {
        return on.call(this, event, listener);
      }
      finally {
        // old-style streaming overwrites .on and .addListener, so rewrap
        if (!this.on.__wrapped) wrap(this, 'on', adding);
        if (!this.addListener.__wrapped) wrap(this, 'addListener', adding);
      }
    };
  }

  function emitting(emit) {
    return function emitted(event) {
      if (!this._events || !this._events[event]) return emit.apply(this, arguments);

      var unwrapped = this._events[event];

      function wrapListeners(unwrapped) {
        if (!unwrapped) return;

        var wrapped = unwrapped;
        if (typeof unwrapped === 'function') {
          wrapped = onEmit(unwrapped);
        }
        else if (Array.isArray(unwrapped)) {
          wrapped = [];
          for (var i = 0; i < unwrapped.length; i++) {
            wrapped[i] = onEmit(unwrapped[i]);
          }
        }
        return wrapped;
      }

      /* Ensure that if removeListener gets called, it's working with the
       * unwrapped listeners.
       */
      function remover(removeListener) {
        return function removed() {
          this._events[event] = unwrapped;
          try {
            return removeListener.apply(this, arguments);
          }
          finally {
            unwrapped = this._events[event];
            this._events[event] = wrapListeners(unwrapped);
          }
        };
      }
      wrap(this, 'removeListener', remover);

      try {
        /* At emit time, ensure that whatever else is going on, removeListener will
         * still work while at the same time running whatever hooks are necessary to
         * make sure the listener is run in the correct context.
         */
        this._events[event] = wrapListeners(unwrapped);
        return emit.apply(this, arguments);
      }
      finally {
        /* Ensure that regardless of what happens when preparing and running the
         * listeners, the status quo ante is restored before continuing.
         */
        unwrap(this, 'removeListener');
        this._events[event] = unwrapped;
      }
    };
  }

  // support multiple onAddListeners
  if (!emitter[SYMBOL]) {
    emitter[SYMBOL] = onAddListener;
  }
  else if (typeof emitter[SYMBOL] === 'function') {
    emitter[SYMBOL] = [emitter[SYMBOL], onAddListener];
  }
  else if (Array.isArray(emitter[SYMBOL])) {
    emitter[SYMBOL].push(onAddListener);
  }

  // only wrap the core functions once
  if (!emitter.__wrapped) {
    wrap(emitter, 'addListener', adding);
    wrap(emitter, 'on',          adding);
    wrap(emitter, 'emit',        emitting);

    emitter.__unwrap = function () {
      unwrap(emitter, 'addListener');
      unwrap(emitter, 'on');
      unwrap(emitter, 'emit');
      delete emitter[SYMBOL];
      delete emitter.__wrapped;
    };
    emitter.__wrapped = true;
  }
}

shimmer.wrap = wrap;
shimmer.massWrap = massWrap;
shimmer.unwrap = unwrap;
shimmer.wrapEmitter = wrapEmitter;

module.exports = shimmer;
