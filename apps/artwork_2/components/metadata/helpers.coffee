_ = require 'underscore'

module.exports =
  uniq: _.partial(_.uniq, _, (x) -> JSON.stringify x)

  pluck: _.pluck

  consolidate: (list, kinds) ->
    if list.length is 0
      return
    else if list.length is 1
      list[0]
    else
      "#{list.length} #{kinds}"
