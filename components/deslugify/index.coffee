_ = require 'underscore'
_s = require 'underscore.string'

rNumericTrim = _.partial(_s.rtrim, _, /[0-9]/)

isNumeric = (str) -> not isNaN str

preserveFullNumbersRNumericTrim = (str) ->
  return str if isNumeric str
  rNumericTrim str

checkSpecialCases = (str) ->
  return 'Film / Video' if str is 'film-video'
  str

module.exports = _.compose(_s.trim, preserveFullNumbersRNumericTrim, _s.titleize, _s.humanize, checkSpecialCases)
