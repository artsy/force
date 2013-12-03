'use strict';

var test    = require('tap').test;
var shimmer = require('../index.js');
var Emitter = require('events').EventEmitter;

test("bindEmitter", function (t) {
  t.plan(8);

  t.test("with no parameters", function (t) {
    t.plan(2);

    shimmer({logger : function (message) {
      t.equal(message, 'can only wrap real EEs', "got expected message");
    }});

    t.doesNotThrow(function () { shimmer.wrapEmitter(); }, "fails safely");
  });

  t.test("with only an emitter", function (t) {
    t.plan(2);

    shimmer({logger : function (message) {
      t.equal(message, 'must have function to run when adding a new listener',
              "got expected message");
    }});

    t.doesNotThrow(function () {
      shimmer.wrapEmitter(new Emitter());
    }, "fails safely");
  });

  t.test("with only an emitter and a marker", function (t) {
    t.plan(2);

    shimmer({logger : function (message) {
      t.equal(message, 'must have function to wrap listeners when emitting',
              "got expected message");
    }});

    t.doesNotThrow(function () {
      shimmer.wrapEmitter(new Emitter(), function () {});
    }, "fails safely");
  });

  t.test("with all required parameters", function (t) {
    t.plan(4);

    shimmer({logger : function (message) {
      t.fail(message);
      t.end();
    }});

    function nop() {}
    function passthrough(value) { return value; }

    var ee = new Emitter();
    t.doesNotThrow(function () {
      shimmer.wrapEmitter(ee, nop, passthrough);
    }, "monkeypatches correctly");

    t.ok(ee.__wrapped, "is marked as being a wrapped emitter");

    ee.on('test', function (value) {
      t.equal(value, 8, 'value was still passed through');
    });

    t.doesNotThrow(function () {
      ee.emit('test', 8);
    }, "emitting still works");
  });

  t.test("when a listener removes another listener", function (t) {
    t.plan(4);

    shimmer({logger : function (message) {
      t.fail(message);
      t.end();
    }});

    var ee = new Emitter();
    function listener1() { /* nop */ }
    function listener2() { ee.removeListener('listen', listener2); }

    function nop() {}
    function wrap(handler) {
      return function () {
        return handler.apply(this, arguments);
      };
    }
    shimmer.wrapEmitter(ee, nop, wrap);

    ee.on('listen', listener1);
    ee.on('listen', listener2);
    t.equal(ee.listeners('listen').length, 2, "both listeners are there");

    t.doesNotThrow(function () {
      ee.emit('listen');
    }, "emitting still works");
    t.equal(ee.listeners('listen').length, 1, "one listener got removed");
    t.equal(ee.listeners('listen')[0], listener1, "the right listener is still there");
  });

  t.test("when listener explodes", function (t) {
    t.plan(4);

    shimmer({logger : function (message) {
      t.fail(message);
      t.end();
    }});

    var ee = new Emitter();
    shimmer.wrapEmitter(
      ee,
      function marker() {},
      function prepare(handler) {
        return function wrapped() {
          handler.apply(this, arguments);
        };
      }
    );

    function kaboom() {
      throw new Error('whoops');
    }

    ee.on('bad', kaboom);

    t.throws(function () { ee.emit('bad'); });
    t.equal(typeof ee.removeListener, 'function', 'removeListener is still there');
    t.notOk(ee.removeListener.__wrapped, "removeListener got unwrapped");
    t.equal(ee._events.bad, kaboom, "listener isn't still bound");
  });

  t.test("when unwrapping emitter", function (t) {
    t.plan(9);

    shimmer({logger : function (message) {
      t.fail(message);
      t.end();
    }});

    var ee = new Emitter();
    shimmer.wrapEmitter(
      ee,
      function marker() {},
      function passthrough(handler) { return handler; }
    );

    t.ok(ee.addListener.__wrapped, "addListener is wrapped");
    t.ok(ee.on.__wrapped, "on is wrapped");
    t.ok(ee.emit.__wrapped, "emit is wrapped");
    t.notOk(ee.removeListener.__wrapped, "removeListener is not wrapped");

    t.doesNotThrow(function () { ee.__unwrap(); }, "can unwrap without dying");

    t.notOk(ee.addListener.__wrapped, "addListener is unwrapped");
    t.notOk(ee.on.__wrapped, "on is unwrapped");
    t.notOk(ee.emit.__wrapped, "emit is unwrapped");
    t.notOk(ee.removeListener.__wrapped, "removeListener is unwrapped");
  });

  t.test("when wrapping the same emitter multiple times", function (t) {
    t.plan(6);

    shimmer({logger : function (message) {
      t.fail(message);
      t.end();
    }});

    var ee = new Emitter();
    var values = [];
    shimmer.wrapEmitter(
      ee,
      function marker() { values.push(1); },
      function passthrough(handler) { return handler; }
    );

    shimmer.wrapEmitter(
      ee,
      function marker() { values.push(2); },
      function passthrough(handler) { return handler; }
    );

    ee.on('test', function (value) {
      t.equal(value, 31, "got expected value");
      t.deepEqual(values, [1, 2], "both marker functions were called");
    });

    t.ok(ee.addListener.__wrapped, "addListener is wrapped");
    t.ok(ee.on.__wrapped, "on is wrapped");
    t.ok(ee.emit.__wrapped, "emit is wrapped");
    t.notOk(ee.removeListener.__wrapped, "removeListener is not wrapped");

    ee.emit('test', 31);
  });
});
