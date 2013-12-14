_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../collections/artworks.coffee'
Artist                  = require '../../../models/artist.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
relatedArtistsTemplate  = -> require('../templates/related_artists.jade') arguments...
BlurbView               = require './blurb.coffee'
RelatedPostsView        = require './related_posts.coffee'
RelatedGenesView        = require './genes.coffee'
AuthModalView           = require '../../../components/auth_modal/view.coffee'
mediator                = require '../../../lib/mediator.coffee'
InitializeShareButtons  = require '../../../components/mixins/initialize_share.coffee'

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @setupArtworks()
    @setupRelatedArtists()
    @setupBlurb()
    @setupRelatedPosts()
    @setupRelatedGenes()
    @setupShareButtons()

  setupShareButtons: ->
    path = "/artist/#{@model.get 'id'}"
    url = "#{sd.GRAVITY_URL}#{path}"
    text = "#{@model.get 'name'} on Artsy"
    if @model.hasImage('large')
      imageUrl = @model.imageUrl('large')

    InitializeShareButtons.initAndRender(el: @$el, url: url, text: text, imageUrl: imageUrl)

  setupBlurb: ->
    $blurbEl = @$('.artist-info-section .artist-blurb .blurb')
    if $blurbEl.length > 0
      new BlurbView
        el: $blurbEl
        updateOnResize: true
        lineCount: 6

  setupRelatedGenes: ->
    new RelatedGenesView
      model: @model
      el: @$('.artist-info-section .artist-related-genes')

  setupArtworks: ->
    @availableArtworks = new Artworks
    @availableArtworks.url = @model.url() + '/artworks'
    @institutionArtworks = new Artworks
    @institutionArtworks.url = @model.url() + '/artworks'
    new FillwidthView(
      fetchOptions: { 'filter[]': 'for_sale' }
      collection  : @availableArtworks
      seeMore     : true
      el          : @$ '#artist-available-works'
    ).nextPage(false, 10)
    new FillwidthView(
      fetchOptions: { 'filter[]': 'not_for_sale' }
      collection  : @institutionArtworks
      seeMore     : true
      el          : @$('#artist-institution-works')
    ).nextPage(false, 10)

  setupRelatedPosts: ->
    new RelatedPostsView
      el: @$('.artist-info-right .artist-related-posts')
      numToShow: 2
      model: @model
      noPosts: =>
        @$('.artist-info-right').remove()
        @$('.artist-info-left').removeClass('artist-info-left').addClass 'artist-info-center'

  setupRelatedArtists: ->
    @relatedArtistsPage = 1
    @relatedContemporaryPage = 1
    @model.relatedArtists.on 'sync', => @renderRelatedArtists 'Artists'
    @model.relatedContemporary.on 'sync', => @renderRelatedArtists 'Contemporary'
    @nextRelatedArtistsPage 'Artists'
    @nextRelatedArtistsPage 'Contemporary'

  renderRelatedArtists: (type) =>
    @$("#artist-related-#{type.toLowerCase()}").html(
      relatedArtistsTemplate artists: @model["related#{type}"].models
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
      _.defer ->
        view.hideFirstRow()
        view.removeHiddenItems()

  events:
    'click .artist-related-see-more'        : 'nextRelatedPage'
    'click li.artist-related-artist button,
           button#artist-follow-button'     : 'followArtist'

  followArtist: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'login' }

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: { page: @["related#{type}Page"]++ }

module.exports.init = ->
  new ArtistView
    model: new Artist sd.ARTIST
    el   : $('body')
