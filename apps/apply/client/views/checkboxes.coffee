_ = require 'underscore'

module.exports =
  serializeCheckboxes: ->
    _.reduce @$('input:checkbox'), (memo, checkbox) ->
      memo[checkbox.name] = '' unless memo[checkbox.name]?
      memo[checkbox.name] += "#{checkbox.value};" if checkbox.checked
      memo
    , {}
