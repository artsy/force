Backbone = require 'backbone'
Q = require 'bluebird-q'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCell extends Backbone.View

  init: ({@following}) ->

  render: ->
    @$el.html template profile: @model, partner:@partner
    this

  fetch: ->
    @model.fetch().then =>
      @partner = @model.related().owner
      @partner.related().locations.fetch()