Backbone = require 'backbone'
template = -> require('../../templates/sections/cv.jade') arguments...
sd = require('sharify').data
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
query = require '../../queries/cv.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
showHelpers = require '../../../../components/show_cell/helpers.coffee'
artistHelpers = require '../../view_helpers.coffee'
ArtistArtworksView = require './artworks.coffee'

module.exports = class CVView extends ArtistArtworksView
  initialize: ({ @user, @statuses }) ->
    @listenTo this, 'artist:cv:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        articles: @statuses.articles
        shows: @statuses.shows || @statuses.cv
    .then ({ artist }) => @trigger 'artist:cv:sync', artist

  render: (artist = {}) ->
    artistMetadata = artistHelpers.artistMeta @model.toJSON()
    @$el.html template _.extend { showHelpers, artistMetadata }, artist
    if artistMetadata.length == 0
      @$('#artist-cv-section').remove()
    super
    this
