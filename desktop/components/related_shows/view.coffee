_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class RelatedShowsView extends Backbone.View
  defaults:
    nUp: 2
    maxShows: 8

  initialize: (options = {}) ->
    { @maxShows, @nUp } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @render

  render: ->
    @$el.html template
      artist: @model
      shows: @collection.take(@maxShows)
      nUp: @nUp
    this
