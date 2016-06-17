{ partial, uniq, pluck } = _ = require 'underscore'

uniq = partial uniq, _, (x) ->
  JSON.stringify x

consolidate = (list, kinds) ->
  if list.length is 0
    return
  else if list.length is 1
    list[0]
  else if uniq(list).length is 1
    list[0]
  else
    "#{list.length} #{kinds}"

module.exports =
  location: (locations) ->
    cities = pluck locations, 'city'
    consolidate cities, 'locations'

  contacts: (locations) ->
    uniq locations
      .filter ({ phone }) ->
        phone?
