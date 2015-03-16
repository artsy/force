//
// Runs stylus + sqwish on a CSS asset package.
//

var stylus = require('stylus'),
    gzipAsWell = require('./gzip-aswell'),
    fs = require('fs');

module.exports = function(file, options, callback) {
  var start = new Date().getTime();
  console.log('Processing ' + file + '...');
  stylus.render(fs.readFileSync(options.assetsDir + file).toString(), {
    filename: options.assetsDir + file
  }, function(err, css) {
    if (err) return callback(err);
    try { var css = require('sqwish').minify(css) } catch (e) {};
    var fname = options.publicDir + file.split('.')[0] + '.css';
    gzipAsWell(css, fname, '.cgz', options.publicDir, function() {
      var diff = new Date().getTime() - start;
      console.log('Finished processing ' + file + ' in ' + diff + 'ms');
      callback.apply(this, arguments);
    });
  });
}
