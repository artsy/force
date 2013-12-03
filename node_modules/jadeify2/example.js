var transform = require('./test/transform')

transform(__dirname + '/test/simple/example.jade', function (err, output) {
  if (err) throw err
  console.log(output)
})
