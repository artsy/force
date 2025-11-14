/**
 * Module dependencies.
 */
const Strategy = require("./strategy")

/**
 * Expose `Strategy` directly from package.
 */

// biome-ignore lint/suspicious/noGlobalAssign: thing
exports = module.exports = Strategy

/**
 * Export constructors.
 */
exports.Strategy = Strategy
