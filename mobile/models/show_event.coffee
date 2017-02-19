_ = require 'underscore'
Backbone = require 'backbone'
Eventable = require './mixins/eventable.coffee'

module.exports = class ShowEvent extends Backbone.Model
  _.extend @prototype, Eventable

  eventType: ->
    if @get('event_type') is 'Other' then 'Event' else @get('event_type')
