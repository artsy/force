_ = require 'underscore'
_s = require 'underscore.string'
xssFilters = require 'xss-filters'

module.exports = class Serializer
  constructor: (@$form) ->
    @$checkboxes = @$form.find('input:checkbox')

  checkboxes: ->
    _.reduce @$checkboxes, (memo, checkbox) ->
      memo[checkbox.name] = checkbox.checked
      memo
    , {}

  inputs: ->
    _.reduce @$form.serializeArray(), (memo, input) ->
      value = xssFilters.inHTMLData _s.trim input.value
      if memo[input.name]? # Convert to array
        target = _.flatten [memo[input.name]]
        target.push value
        memo[input.name] = target
      else
        memo[input.name] = value
      memo
    , {}

  data: (data = {}) ->
    _.extend data, @inputs(), @checkboxes()

  pick: (keys...) ->
    _.pick @data(), keys...
