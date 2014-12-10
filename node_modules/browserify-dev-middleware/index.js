var extname = require('path').extname
  , exists  = require('fs').existsSync
  , basename = require('path').basename
  , browserify = require('browserify');

module.exports = function(options) {
  return function(req, res, next) {
    if (extname(req.url) == '.js') {
      var b = browserify()
        , path = options.src + req.url;
      if (!exists(path))
        path = options.src + req.url.replace('.js', '') + '.coffee';
      if (exists(path)) {
        b.add(path);
      } else {
        return next();
      }
      (options.transforms || []).forEach(function(t) {
        b.transform(t);
      });
      (options.globalTransforms || []).forEach(function(t) {
        b.transform({ global: true }, t);
      });
      if (options.intercept) options.intercept(b);
      b.bundle(function(err, text) {
        if (err) {
          console.warn(err);
          res.send("alert(\"BROWSERIFY COMPILE ERROR (check your console for more details): " +
                   err.message + "\");");
        } else {
          res.send(text);
        }
      });
    } else {
      return next();
    }
  }
};