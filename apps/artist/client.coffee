_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require '../../models/artwork.coffee'
Artist = require '../../models/artist.coffee'
sd = require('sharify').data
FillwidthView = require '../../components/fillwidth_row/view.coffee'
relatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @setupArtworkRows()
    @setupArtistRows()

  setupArtworkRows: ->
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

  setupArtistRows: ->
    @relatedArtistsPage = 1
    @relatedContemporaryPage = 1
    @model.relatedArtists.on 'sync', => @renderRelatedArtists 'Artists'
    @model.relatedContemporary.on 'sync', => @renderRelatedArtists 'Contemporary'
    @nextRelatedArtistsPage 'Artists'
    @nextRelatedArtistsPage 'Contemporary'

  renderRelatedArtists: (type) =>
    @$("#artist-related-#{type.toLowerCase()}").html(
      relatedArtistsTemplate artists: @model.relatedArtists.models
    )
    @model["related#{type}"].each (artist, i) =>
      console.log artist.get('name')
      @renderRelatedArtist artist, i, type

  renderRelatedArtist: (artist, i, type) ->
    artist.fetchArtworks data: { size: 10 }, success: (artworks) =>
      view = new FillwidthView
        collection: artworks
        el: @$("#artist-related-#{type.toLowerCase()} " +
               "li:nth-child(#{i + 1}) .artist-related-artist-artworks")
      view.render()
      _.defer view.hideFirstRow

  events:
    'click .artist-related-see-more': 'nextRelatedPage'

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: { page: @["related#{type}Page"]++ }

module.exports.init = ->
  new ArtistView el: $('body'), model: new Artist sd.ARTIST