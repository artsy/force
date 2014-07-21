var jsdom = require('jsdom');
var rewire = require('rewire');
var path = require('path');
var fs = require('fs');

var domGlobals = [
  'navigator',
  'document',
  'location',
  'getComputedStyle',
  'btoa'
];

var globals = {};

// Exposes a stubbed browser API and benv.globals into the node.js global namespace
// so the current process can act like a browser environment.
//
// @param {Function} callback

module.exports.setup = function(callback) {
  if (typeof window != 'undefined') return callback && callback();
  jsdom.env({
    html: "<html><body></body></html>",
    done: function(errs, w) {
      global.window = w;
      domGlobals.forEach(function(varName) {
        global[varName] = w[varName] || function(){};
      });
      if (callback) callback();
    }
  })
}

// Pass in common client-side dependencies and expose them globally.
//
// @param {Object} globals

module.exports.expose = function(_globals) {
  for(var key in _globals) {
    global[key] = globals[key] = _globals[key];
  }
}

// Deletes the stubbed browser API, benv.globals, and cleans things up so other
// tests can run without being harmed.

module.exports.teardown = function(clearDOM) {
  if (clearDOM !== false) {
    delete global.window;
    domGlobals.forEach(function(varName) {
      delete global[varName];
    });
  }
  for(var key in globals) {
    delete global[key];
  }
}

// Require non-commonjs modules by specifying their global variable.
//
// @param {String} filename Path to non-commonjs file
// @param {String} globalVarName Exposed global like Zepto or GMaps

module.exports.require = function(filename, globalVarName) {
  var fullPath = path.resolve(path.dirname(module.parent.filename), filename);
  if (!fs.existsSync(fullPath)) fullPath = require.resolve(filename);
  var mod = rewire(fullPath);
  var w = mod.__get__('window');
  return globalVarName ? (w[globalVarName] || mod.__get__(globalVarName)) : mod;
}

// Renders a server-side template into a fake browser's body.
// Will strip out all script tag first to avoid jsdom trying to run scripts.
//
// @param {String} filename
// @param {Object} data data passed into template like jade locals

module.exports.render = function(filename, data, callback) {
  if (!window) throw Error('You must run benv.setup first.');
  if (!filename.match('.jade')) throw Error('Could not identify template type');
  var fullPath = path.resolve(path.dirname(module.parent.filename), filename);
  var html = require('jade').compile(
    fs.readFileSync(fullPath),
    { filename: fullPath }
  )(data);
  jsdom.env(html, function(err, w) {
    var scriptEls = w.document.getElementsByTagName('script');
    Array.prototype.forEach.call(scriptEls, function(el) {
      el.parentNode.removeChild(el);
    });
    var bodyHtml = w.document.getElementsByTagName('body')[0].innerHTML;
    document.getElementsByTagName('body')[0].innerHTML = bodyHtml;
    if (callback) callback();
  });
}

// Rewires jadeify templates to work in node again.
//
// @param {String} filename
// @param {Array} varNames Strings of template variable names

module.exports.requireWithJadeify = function(filename, varNames) {
  var fullPath = path.resolve(path.dirname(module.parent.filename), filename);
  var mod = rewire(fullPath);
  var dir = path.dirname(mod.__get__('module').filename);
  varNames.forEach(function(varName) {
    var section = mod.__get__(varName).toString()
      .match(/require\('(.*).jade'\)/);
    if(!section) section = mod.__get__(varName).toString()
      .match(/require\("(.*).jade"\)/);
    var tmplFilename = section[1] + '.jade'
    tmplFilename = path.resolve(dir, tmplFilename);
    mod.__set__(varName, require('jade').compile(
      fs.readFileSync(tmplFilename),
      { filename: tmplFilename }
    ));
  });
  return mod;
}