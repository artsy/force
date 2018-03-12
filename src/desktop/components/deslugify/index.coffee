_ = require 'underscore'
_s = require 'underscore.string'

rNumericTrim = _.partial(_s.rtrim, _, /[0-9]/)

isNumeric = (str) -> not isNaN str

isDecade = (str) ->
  isNumeric(str) and
  str.length is 4 and
  parseInt(str.charAt(str.length - 1)) is 0

decadeify = (str) ->
  if isDecade(str) then "#{str}s" else str

preserveFullNumbersRNumericTrim = (str) ->
  return str if isNumeric str
  rNumericTrim str

checkSpecialCases = (str) ->
  return 'Film / Video' if str is 'film-video'
  str

symbolWords = (str) ->
  str
    .replace(/\sslash\s/i, ' / ')
    .replace(/\sdot\s/i, '.')
    .replace(/\splus\s/i, ' + ')

module.exports = _.compose(
  _s.trim
  symbolWords
  decadeify
  preserveFullNumbersRNumericTrim
  _s.titleize
  _s.humanize
  checkSpecialCases
)
