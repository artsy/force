Backbone = require 'backbone'
ViewHelpers = require '../../helpers/view_helpers.coffee'
template = -> require('./template.jade') arguments...
{ sortBy } = require 'underscore'

module.exports = class EventsModalView extends Backbone.View
  className: 'show-events-modal'

  initialize: (options = {}) ->
    { @show, @events } = options

  render: ->
    sortedEvents = sortBy @events, 'start_at'
    @$el.html template(show: @show, showEvents: sortedEvents, ViewHelpers: ViewHelpers)
    this
