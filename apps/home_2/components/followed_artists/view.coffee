Backbone = require 'backbone'
template = -> require('./templates/index.jade')

module.exports = class FollowedArtistsRailView extends Backbone.View

  initialize: ({ @module, @$el }) ->
    # no op

  render: ->
    @$el.html template
      artworks: @module.results
      artists: @module.context.artists
      counts: @module.context.counts