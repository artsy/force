(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sd;

sd = require('sharify').data;

$(function() {
  return $('body').append("<br><br>your email from the client-side!<br> " + sd.CURRENT_USER.email);
});


},{"sharify":2}],2:[function(require,module,exports){
// Middleware that injects the shared data and sharify script
module.exports = function(req, res, next) {

  // Clone the "constant" sharify data for the request so
  // request-level data isn't shared across the server potentially
  // exposing sensitive data.
  var data = {};
  for(var key in module.exports.data) {
    data[key] = module.exports.data[key];
  };

  // Inject a sharify object into locals for `= sharify.data` and `= sharify.script()`
  res.locals.sharify = {
    data: data,
    script: function() {
      return '<script type="text/javascript">' +
               'window.__sharifyData = ' +
               //There are tricky rules about safely embedding JSON within HTML
               //see http://stackoverflow.com/a/4180424/266795
               JSON.stringify(data)
                 .replace(/</g, '\\u003c')
                 .replace(/-->/g, '--\\>') +
               ';</script>';
    }
  };

  // Alias the sharify short-hand for convience
  res.locals.sd = res.locals.sharify.data;

  next();
};

// The shared hash of data
module.exports.data = {};

// When required on the client via browserify, run this snippet that reads the
// sharify.script data and injects it into this module.
var bootstrapOnClient = module.exports.bootstrapOnClient = function() {
  if (typeof window != 'undefined' && window.__sharifyData) {
    module.exports.data = window.__sharifyData;
  }
};
bootstrapOnClient();

},{}]},{},[1])