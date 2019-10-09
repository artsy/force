Backbone = require 'backbone'
ViewHelpers = require '../../helpers/view_helpers.coffee'
template = -> require('./template.pug') arguments...

module.exports = class EventsModalView extends Backbone.View
  className: 'show-events-modal'

  initialize: (options = {}) ->
    { @show, @events } = options

  render: ->
    @$el.html template(show: @show, showEvents: @events, ViewHelpers: ViewHelpers)
    this
