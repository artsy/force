Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    interest = new Backbone.Model @get('interest')

    @__related__ =
      interest: interest
