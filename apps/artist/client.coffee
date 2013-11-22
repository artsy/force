Backbone = require 'backbone'
Artwork = require '../../models/artwork.coffee'
Artist = require '../../models/artist.coffee'
sd = require('sharify').data
FillwidthView = require '../../components/fillwidth_row/view.coffee'
BlurbView = require '../artist/blurb.coffee'

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @availableArtworks = new Backbone.Collection [], model: Artwork
    @availableArtworks.url = @model.url() + '/artworks'
    @institutionArtworks = new Backbone.Collection [], model: Artwork
    @institutionArtworks.url = @model.url() + '/artworks'
    new FillwidthView
      collection: @availableArtworks
      el: @$ '#artist-available-works'
      fetchOptions: { 'filter[]': 'for_sale' }
      seeMore: true
    new FillwidthView
      collection: @institutionArtworks
      el: @$ '#artist-institution-works'
      fetchOptions: { 'filter[]': 'not_for_sale' }
      seeMore: true

    # Expandable see more blurb
    $blurbEl = @$('.artist-info-section .artist-blurb .blurb')
    if $blurbEl.length > 0
      new BlurbView
        el: $blurbEl
        updateOnResize: true
        lineCount: 6

module.exports.init = ->
  new ArtistView el: $('body'), model: new Artist sd.ARTIST