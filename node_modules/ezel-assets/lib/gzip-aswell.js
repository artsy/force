//
// Outputs a gzipped file as well as the original.
//

var async = require('async'),
    gzip = require('zlib').gzip,
    fs = require('fs');

module.exports = function(src, fname, gext, out, callback) {
  // TODO: Skip gzip in development/test
  gzip(src, function(err, buf) {
    if (err) return cb(err);
    async.parallel([
      async.apply(fs.writeFile, fname, src),
      async.apply(fs.writeFile, fname + gext, buf)
    ], callback);
  });
}
