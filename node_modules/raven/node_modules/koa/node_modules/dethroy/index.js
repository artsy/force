var Stream = require('stream')

module.exports = function (stream) {
  if (stream instanceof Stream) {
    if (typeof stream.destroy === 'function')
      stream.destroy()
    // else if (typeof stream.close === 'function')
      // stream.close()
  }

  return stream
}
