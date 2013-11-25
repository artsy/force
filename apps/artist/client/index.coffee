_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
Artist = require '../../../models/artist.coffee'
sd = require('sharify').data
FillwidthView = require '../../../components/fillwidth_row/view.coffee'
relatedArtistsTemplate = -> require('../templates/related_artists.jade') arguments...
BlurbView = require './blurb.coffee'
RelatedPostsView = require './related_posts.coffee'

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @setupArtworks()
    @setupRelatedArtists()
    @setupBlurb()
    @setupRelatedPosts()

  setupBlurb: ->
    $blurbEl = @$('.artist-info-section .artist-blurb .blurb')
    if $blurbEl.length > 0
      new BlurbView
        el: $blurbEl
        updateOnResize: true
        lineCount: 6

  setupArtworks: ->
    @availableArtworks = new Artworks
    @availableArtworks.url = @model.url() + '/artworks'
    @institutionArtworks = new Artworks
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

  setupRelatedPosts: ->
    new RelatedPostsView
      el: @$('.artist-info-right .artist-related-posts')
      numToShow: 2
      model: @model

  setupRelatedArtists: ->
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