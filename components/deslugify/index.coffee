_ = require 'underscore'
_s = require 'underscore.string'
rNumericTrim = _.partial(_s.rtrim, _, /[0-9]/)
module.exports = _.compose(_s.trim, rNumericTrim, _s.titleize, _s.humanize)
