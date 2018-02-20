_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('../../templates/sections/shows.jade') arguments...
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
showHelpers = require '../../../../components/show_cell/helpers.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
query = require '../../queries/shows.coffee'
ArtistArtworksView = require './artworks.coffee'

module.exports = class ShowsView extends ArtistArtworksView
  initialize: ->
    @listenTo this, 'artist:shows:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
    .then ({ artist }) => @trigger 'artist:shows:sync', artist

  postRender: ->
    super
    @fadeInSection $('#artist-related-shows-section')

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'

  render: (artist) ->
    @$el.html template _.extend { showHelpers }, artist
    super
    this
