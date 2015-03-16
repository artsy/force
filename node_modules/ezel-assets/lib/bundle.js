//
// Runs browserify + transforms on a JS asset package.
//

var browserify = require('browserify'),
    gzipAsWell = require('./gzip-aswell');

module.exports = function(file, options, callback) {
  var start = new Date().getTime();
  console.log('Bundling ' + file + '...');
  var b = browserify().add(options.assetsDir + file);

  // TODO: Skip uglifify in development/test
  options.transforms.forEach(function(transform) {
    try { b.transform(require(transform)) } catch (e) {};
  });
  b.bundle(function(err, buf) {
    if (err) return callback(err);
    var fname = options.publicDir + file.split('.')[0] + '.js';
    gzipAsWell(buf, fname, '.jgz', options.publicDir, function() {
      var diff = new Date().getTime() - start;
      console.log('Finished bundling ' + file + ' in ' + diff + 'ms');
      callback.apply(this, arguments);
    });
  });
}
