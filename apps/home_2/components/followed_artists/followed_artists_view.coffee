Backbone = require 'backbone'
template = -> require('./templates/context.jade') arguments...

module.exports = class FollowedArtistsView extends Backbone.View

  initialize: ->
    @listenTo @collection, 'add', @render

  render: ->
    @$el.html template
      artists: @collection.first 7
      counts: artists: @collection.length

    this
