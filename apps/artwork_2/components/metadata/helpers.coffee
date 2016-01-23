{ pluck } = require 'underscore'

module.exports =
  pluck: pluck

  consolidate: (list, kinds) ->
    if list.length is 0
      return
    else if list.length is 1
      list[0]
    else
      "#{list.length} #{kinds}"
