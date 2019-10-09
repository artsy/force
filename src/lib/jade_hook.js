/**
 * Hook for compiling pug templates from Mocha tests. Works in hand with new
 * server-side React-based flow fallbacks
 */
import pug from "pug"

function compile(module, filename) {
  const template = pug.compileFile(filename)
  module.exports = template
}

if (require.extensions) {
  require.extensions[".pug"] = compile
}
