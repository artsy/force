/**
 * Trickery to ensure that the mock is the default export.
 */

module.exports = jest.fn()
module.exports.default = module.exports
