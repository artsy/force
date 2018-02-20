_ = require 'underscore'

module.exports =
  compactObject: (o) ->
    clone = _.clone(o)
    _.each clone, (v, k) ->
      if (!v)
        delete clone[k]
    clone
