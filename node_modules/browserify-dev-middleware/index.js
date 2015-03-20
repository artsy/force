var extname = require('path').extname,
    fs = require('fs'),
    basename = require('path').basename,
    browserify = require('browserify'),
    watchify = require('watchify'),
    debug = require('debug')('browserify-dev-middleware'),
    _ = require('underscore');

var watchers = {};
var cached = {};

var bundleAndCache = function(w, path) {
  w.bundle(function(err, src) {
    if (err) {
      console.warn(err.message);
      cached[path] = "alert(\"BROWSERIFY COMPILE ERROR (check your " +
        "console for more details): " + err.message + "\");";
      w.emit('error');
    } else {
      cached[path] = src.toString();
    }
  });
}

module.exports = function(options) {
  return function(req, res, next) {
    if (extname(req.url) == '.js') {
      debug("Bundling " + req.url);

      // Make sure the source file exists
      var path = options.src + req.url;
      fs.exists(path, function(exists) {
        if (!exists) path = options.src + req.url.replace('.js', '.coffee');
        fs.exists(path, function(exists) {
          if (!exists) return next();

          var w;

          // Create a new bundle & watcher if we haven't done so. Then start
          // and initial bundling.
          if (!watchers[path]) {
            var b = browserify(_.extend(_.omit(options,
              'transforms', 'globalTransforms', 'src'
            ), watchify.args));
            b.add(path);
            (options.transforms || []).forEach(function(t) {
              b.transform(t);
            });
            (options.globalTransforms || []).forEach(function(t) {
              b.transform({ global: true }, t);
            });
            w = watchers[path] = watchify(b);
            bundleAndCache(w, path);
          } else {
            w = watchers[path];
          }

          // Re-bundle & cache the output on file change
          w.on('update', function() {
            cached[path] = null;
            bundleAndCache(w, path);
          });

          // Serve cached asset if it hasn't change
          if (cached[path]) {
            debug("Finished bundling " + req.url);
            res.send(cached[path]);
          } else {
            var end = _.once(function() {
              setTimeout(function() {
                debug("Finished bundling " + req.url);
                res.send(cached[path]);
              });
            });
            w.once('time', end).once('error', end);
          }
        });
      });
    } else {
      return next();
    }
  }
};