var path = require('path'),
    glob = require('glob'),
    fs = require('fs'),
    knox = require('knox'),
    exec = require('child_process').exec,
    _ = require('underscore'),
    crypto = require('crypto'),
    NODE_ENV = process.env.NODE_ENV,
    COMMIT_HASH = process.env.COMMIT_HASH,
    mime = require('mime');

// Middleware to find your uploaded assets based on git hash & uploaded manifest.
//
// @param {Object} options See README.md for details

module.exports = function(options) {

  // If it's not production or staging, just return the noop view helper
  if (NODE_ENV != 'staging' && NODE_ENV != 'production')
    return function(req, res, next) {
      res.locals.asset = function(filename) { return filename };
      next();
    }

  // Setup callbacks so we can queue requets until we've got the manifest.
  var manifest, opts, manifestErr, manifestCallbacks = [];
  var onManifestFetched = function(callback) {
    manifestCallbacks.push(callback);
  };
  var manifestCallback = function(err) {
    manifestCallbacks.forEach(function(callback) {
      callback(err);
    });
  }

  // Fetch the manifest
  setup(options, function(err, options, client, gitHash) {
    opts = options;
    if (err) return manifestCallback(manifestErr = err);
    client.getFile('/manifest-' + gitHash.trim() + '.json', function(err, res) {
      if (err) return manifestCallback(manifestErr = err);
      var bufs = [];
      res.on('data', function(d) { bufs.push(d); });
      res.on('end', function() {
        try {
          manifest = JSON.parse(Buffer.concat(bufs).toString());
          manifestCallback();
        } catch (err) {
          console.warn(Buffer.concat(bufs).toString());
          manifestCallback(manifestErr = err);
        }
      });
    });
  });

  // Once the manifest is fetched attach a helper to lookup the file in the
  // manifest or noop.
  return function(req, res, next) {
    if (manifestErr) return next(manifestErr);
    res.locals.asset = function(filename) {
      return manifest[filename] ? opts.cdnUrl + manifest[filename] : filename;
    }
    manifest ? next() : onManifestFetched(next);
  }
};

// Uploads to S3 based on options passed in.
//
// @param {Object} options See README.md for details

module.exports.upload = function(options) {
  setup(options, function(err, options, client, gitHash) {
    if (err) return options.callback(err);

    var files = glob.sync(options.files, { nodir: true }).filter(function(f) {
      return !f.match('node_modules');
    });

    // Create a manifest of fingerprinted JS/CSS
    var manifest = {};
    files.forEach(function(file) {
      var ext = path.extname(file);
      if(ext != '.js' && ext != '.css') return;
      var contents = fs.readFileSync(file);
      var hash = crypto.createHash('sha1')
        .update(contents).digest('hex').slice(0, 8);
      var fingerprintedFilename = path.basename(file, ext) + '-' + hash + ext;
      var key = _.last(file.split(options.root));
      manifest[key] = path.join(path.dirname(key), fingerprintedFilename);
    });

    // Upload the manifest
    var manifestDest = '/manifest-' + gitHash.trim() + '.json';
    client.putBuffer(
      JSON.stringify(manifest),
      manifestDest,
      { 'Cache-Control': 'max-age=315360000, public' },
      function(err) {
        console.log('Uploaded manifest to ' + options.bucket + manifestDest);
        if (err) return options.callback(err);

        // Upload each file to S3
        options.callback = _.after(
          files.length,
          options.callback || function() {}
        );
        files.forEach(function(filename) {

          // Generate headers
          var contentType = mime.lookup(
            path.extname(filename.replace('.gz', '').replace('.cgz', ''))
          );
          var headers = {
            'Cache-Control': 'max-age=315360000, public',
            'Content-Type': contentType,
            'x-amz-acl': 'public-read'
          };
          if(filename.match(/\.gz$/) || filename.match(/\.cgz$/))
            headers['Content-Encoding'] = 'gzip';

          // Upload file
          var s3Path = _.last(filename.split(options.root));
          if (manifest[s3Path]) s3Path = manifest[s3Path];
          client.putFile(filename, s3Path, headers, function(err, res) {
            if (err) {
              console.warn('Error uploading ' + filename + ' to ' +
                options.bucket + s3Path + ': ' + err);
            } else {
              console.log('Uploaded ' + filename + ' to ' +
                options.bucket + s3Path + ' (' + contentType + ')' );
              options.callback()
            }
          });
        });
      }
    );
  });
};

// Common setup whether using middleware or CLI.
// Sets defaults on options, creates a knox client, and retrieves the current
// git hash.
//
// @param {Object} options
// @param {Function} callback Calls back with (err, options, client, gitHash)

var setup = function(options, callback) {
  if (!options) options = {};
  var options = _.clone(_.defaults(options, {
    files: process.cwd() + '/**/public/**',
    root: 'public',
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    cdnUrl: process.env.CDN_URL
  }));
  var client = knox.createClient({
    key: options.key,
    secret: options.secret,
    bucket: options.bucket
  });
  if (COMMIT_HASH) return callback(null, options, client, COMMIT_HASH);
  exec('git rev-parse --short HEAD', function(err, gitHash) {
    callback(err, options, client, gitHash);
  });
};
