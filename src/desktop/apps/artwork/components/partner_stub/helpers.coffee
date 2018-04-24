{ partial, uniq, pluck } = _ = require 'underscore'

uniq = partial uniq, _, (x) ->
  JSON.stringify x

module.exports =
  location: (locations) ->
    cities = pluck locations, 'city'
    uniq(cities).join(', ')
