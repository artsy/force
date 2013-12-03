var through = require('through')
var jade = require('jade')

module.exports = browjadify

function browjadify(file, options) {
  if (!/\.jade$/.test(file)) return through()

  if (!options) options = { client: true, filename: file, compileDebug: false }

  var source = ''
  var stream = through(write, end)

  function write(buf) {
    source += buf
  }

  function end() {
    try {
      var result = compile(file, source, options)
      this.queue(result)
      this.queue(null)
    } catch (err) {
      stream.emit('error', err)
    }
  }

  return stream
}

function compile(file, source, options) {
  var template = jade.compile(source, options)
  return [
    'var jade = require(\'jade/lib/runtime.js\');',
    'module.exports = ',
    template.toString()
  ].join('')
}

