Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class EventsModalView extends Backbone.View
  className: 'show-events-modal'

  render: ->
    @$el.html template(show: @model, showEvents: @collection)
    this
