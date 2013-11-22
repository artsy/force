_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require '../../models/artwork.coffee'
Artist = require '../../models/artist.coffee'
sd = require('sharify').data
FillwidthView = require '../../components/fillwidth_row/view.coffee'
relatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @relatedArtistsPage = 1
    @relatedContemporaryPage = 1
    @availableArtworks = new Backbone.Collection [], model: Artwork
    @availableArtworks.url = @model.url() + '/artworks'
    @institutionArtworks = new Backbone.Collection [], model: Artwork
    @institutionArtworks.url = @model.url() + '/artworks'
    new FillwidthView(
      collection: @availableArtworks
      el: @$ '#artist-available-works'
      fetchOptions: { 'filter[]': 'for_sale' }
      seeMore: true
    ).nextPage()
    new FillwidthView(
      collection: @institutionArtworks
      el: @$ '#artist-institution-works'
      fetchOptions: { 'filter[]': 'not_for_sale' }
      seeMore: true
    ).nextPage()
    @model.relatedArtists.on 'sync', @renderRelatedArtists
    @nextRelatedArtistsPage()
    @nextRelatedContemporaryPage()

  renderRelatedArtists: =>
    @$('#artist-related-artists .responsive-side-margin').html relatedArtistsTemplate
      artists: @model.relatedArtists.models
    @model.relatedArtists.each (artist, i) =>
      @renderRelatedRow artist, i, '#artist-related-artists'

  renderRelatedContemporary: =>
    @$('#artist-related-contemporary .responsive-side-margin').html relatedArtistsTemplate
      artists: @model.relatedContemporary.models
    @model.relatedContemporary.each (artist, i) =>
      @renderRelatedRow artist, i, '#artist-related-contemporary'

  renderRelatedRow: (artist, i, scope) ->
    artist.fetchArtworks data: { size: 10 }, success: (artworks) =>
      view = new FillwidthView
        collection: artworks
        el: @$ "#{scope} li:nth-child(#{i + 1}) .artist-related-artist-artworks"
      view.render()
      _.defer view.hideFirstRow

  events:
    'click #artist-related-artists .artist-related-see-more': 'nextRelatedArtistsPage'

  nextRelatedArtistsPage: ->
    @model.fetchRelatedArtists data: page: @relatedArtistsPage++

  fetchRelatedContemporary: ->
    @model.fetchRelatedContemporary data: page: @relatedContemporaryPage++

module.exports.init = ->
  new ArtistView el: $('body'), model: new Artist sd.ARTIST