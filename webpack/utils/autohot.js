// @ts-check

/**
 * Quickly make all of our entry points hot reloadable without a ton of code.
 */
module.exports = function (source) {
  source += "\nif (module.hot) { module.hot.accept() }\n"
  return source
}
