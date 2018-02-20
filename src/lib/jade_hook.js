/**
 * Hook for compiling jade templates from Mocha tests. Works in hand with new
 * server-side React-based flow fallbacks
 */
import jade from 'jade'

function compile(module, filename) {
  const template = jade.compileFile(filename)
  module.exports = template
}

if (require.extensions) {
  require.extensions['.jade'] = compile
}
