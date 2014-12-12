'use strict';

if (process.addAsyncListener) throw new Error("Don't require polyfill unless needed");

var shimmer      = require('shimmer')
  , wrap         = shimmer.wrap
  , massWrap     = shimmer.massWrap
  , wrapCallback = require('./glue.js')
  ;

// Shim activator for functions that have callback last
function activator(fn) {
  return function () {
    var index = arguments.length - 1;
    if (typeof arguments[index] === "function") {
      arguments[index] = wrapCallback(arguments[index]);
    }
    return fn.apply(this, arguments);
  };
}

// Shim activator for functions that have callback first
function activatorFirst(fn) {
  return function () {
    if (typeof arguments[0] === "function") {
      arguments[0] = wrapCallback(arguments[0]);
    }
    return fn.apply(this, arguments);
  };
}

var net = require('net');

// a polyfill in our polyfill etc so forth -- taken from node master on 2013/10/30
if (!net._normalizeConnectArgs) {
  net._normalizeConnectArgs = function (args) {
    var options = {};

    function toNumber(x) { return (x = Number(x)) >= 0 ? x : false; }

    if (typeof args[0] === 'object' && args[0] !== null) {
      // connect(options, [cb])
      options = args[0];
    }
    else if (typeof args[0] === 'string' && toNumber(args[0]) === false) {
      // connect(path, [cb]);
      options.path = args[0];
    }
    else {
      // connect(port, [host], [cb])
      options.port = args[0];
      if (typeof args[1] === 'string') {
        options.host = args[1];
      }
    }

    var cb = args[args.length - 1];
    return typeof cb === 'function' ? [options, cb] : [options];
  };
}

wrap(net.Server.prototype, '_listen2', function (original) {
  return function () {
    this.on('connection', function (socket) {
      if (socket._handle) {
        socket._handle.onread = wrapCallback(socket._handle.onread);
      }
    });

    try {
      return original.apply(this, arguments);
    }
    finally {
      // the handle will only not be set in cases where there has been an error
      if (this._handle && this._handle.onconnection) {
        this._handle.onconnection = wrapCallback(this._handle.onconnection);
      }
    }
  };
});

wrap(net.Socket.prototype, 'connect', function (original) {
  return function () {
    var args = net._normalizeConnectArgs(arguments);
    if (args[1]) args[1] = wrapCallback(args[1]);
    var result = original.apply(this, args);
    if (this._handle) {
      this._handle.onread = wrapCallback(this._handle.onread);
    }
    return result;
  };
});

// need unwrapped nextTick for use within < 0.9 async error handling
if (!process._fatalException) {
  process._originalNextTick = process.nextTick;
}

var processors = ['nextTick'];
if (process._nextDomainTick) processors.push('_nextDomainTick');
if (process._tickDomainCallback) processors.push('_tickDomainCallback');

massWrap(
  process,
  processors,
  activator
);

var asynchronizers = [
  'setTimeout',
  'setInterval'
];
if (global.setImmediate) asynchronizers.push('setImmediate');

massWrap(
  require('timers'),
  asynchronizers,
  activatorFirst
);

var dns = require('dns');
massWrap(
  dns,
  [
    'lookup',
    'resolve',
    'resolve4',
    'resolve6',
    'resolveCname',
    'resolveMx',
    'resolveNs',
    'resolveTxt',
    'resolveSrv',
    'reverse'
  ],
  activator
);

if (dns.resolveNaptr) wrap(dns, 'resolveNaptr', activator);

var fs = require('fs');
massWrap(
  fs,
  [
    'watch',
    'rename',
    'truncate',
    'chown',
    'fchown',
    'chmod',
    'fchmod',
    'stat',
    'lstat',
    'fstat',
    'link',
    'symlink',
    'readlink',
    'realpath',
    'unlink',
    'rmdir',
    'mkdir',
    'readdir',
    'close',
    'open',
    'utimes',
    'futimes',
    'fsync',
    'write',
    'read',
    'readFile',
    'writeFile',
    'appendFile',
    'watchFile',
    'unwatchFile',
    "exists",
  ],
  activator
);

// only wrap lchown and lchmod on systems that have them.
if (fs.lchown) wrap(fs, 'lchown', activator);
if (fs.lchmod) wrap(fs, 'lchmod', activator);

// only wrap ftruncate in versions of node that have it
if (fs.ftruncate) wrap(fs, 'ftruncate', activator);

// Wrap zlib streams
var zlib;
try { zlib = require('zlib'); } catch (err) { }
if (zlib && zlib.Deflate && zlib.Deflate.prototype) {
  var proto = Object.getPrototypeOf(zlib.Deflate.prototype);
  if (proto._transform) {
    // streams2
    wrap(proto, "_transform", activator);
  }
  else if (proto.write && proto.flush && proto.end) {
    // plain ol' streams
    massWrap(
      proto,
      [
        'write',
        'flush',
        'end'
      ],
      activator
    );
  }
}

// Wrap Crypto
var crypto;
try { crypto = require('crypto'); } catch (err) { }
if (crypto) {
  massWrap(
    crypto,
    [
      'pbkdf2',
      'randomBytes',
      'pseudoRandomBytes',
    ],
    activator
  );
}
