Backbone = require 'backbone'
Q = require 'bluebird-q'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCell extends Backbone.View

  init: ({@following}) ->

  render: ->
    imageUrl = @model.coverImage().imageUrl()
    @$el.html template profile: @model, partner:@partner, imageUrl:imageUrl
    this

  fetch: ->
    @model.fetch().then =>
      @partner = @model.related().owner
      @partner.related().locations.fetch()