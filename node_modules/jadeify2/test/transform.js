var
  jadeify = require('..'),
  fs = require('fs')

module.exports = function transform(filename, callback) {
  var
    pipe = jadeify(filename),
    output = ''
  fs.createReadStream(filename).pipe(pipe)
  pipe.on('error', function (error) {
      callback(error)
    })
    .on('data', function (data) {
      output += data
    })
    .on('end', function () {
      callback(null, output)
    })
}