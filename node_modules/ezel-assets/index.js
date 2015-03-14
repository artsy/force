var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    bundle = require('./lib/bundle'),
    preprocess = require('./lib/preprocess'),
    gzipAsWell= require('./lib/gzip-aswell');

module.exports = function(options, callback) {
  async.map(options.files, function(file, cb) {
    switch(path.extname(file)) {
      case '.js':
      case '.coffee':
        bundle(file, options, cb);
        break;
      case '.styl':
        preprocess(file, options, cb);
        break;
      default:
        cb();
     }
  }, callback);
}
