Backbone = require 'backbone'
template = -> require('../templates/how_can_we_help.jade') arguments...

module.exports = class HowCanWeHelpYouView extends Backbone.View
  events:
    'click a': 'select'

  initialize: ({ @state }) -> #

  select: (e) ->
    answer = $(e.currentTarget).data 'answer'
    @state.set 'value', answer
    @state.next()

  render: ->
    @$el.html template()
    this
