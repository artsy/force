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
CurrentUser             = require '../../../models/current_user.coffee'
FollowArtistCollection  = require '../../../models/follow_artist_collection.coffee'
FollowButton            = require './follow_button.coffee'
ShareView               = require '../../../components/share/view.coffee'
AuctionLots             = require '../../../collections/auction_lots.coffee'

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @setupCurrentUser()
    @setupFollowButton()
    @setupArtworks()
    @setupRelatedArtists()
    @setupBlurb()
    @setupRelatedPosts()
    @setupRelatedGenes()
    @setupShareButtons()

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupFollowButton: ->
    if @currentUser
      @followArtistCollection = new FollowArtistCollection
    new FollowButton
      followArtistCollection: @followArtistCollection
      model: @model
      el: @$('button#artist-follow-button')

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

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

    $availableWorks = @$('#artist-available-works')
    $institutionalWorks = @$('#artist-institution-works')

    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'for_sale' }
      collection: @availableArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $availableWorks
    ).nextPage(false, 10)

    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'not_for_sale' }
      collection: @institutionArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $institutionalWorks
    ).nextPage(false, 10)

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
    $artistContainer = @$("#artist-related-#{type.toLowerCase()}")
    return $artistContainer.parent().remove() unless @model["related#{type}"]?.models.length > 0

    $artistContainer.html(
      relatedArtistsTemplate artists: @model["related#{type}"].models
    )
    @model["related#{type}"].each (artist, i) =>
      @renderRelatedArtist artist, i, type

  renderRelatedArtist: (artist, i, type) ->
    artist.fetchArtworks data: { size: 10 }, success: (artworks) =>
      $artistRow = @$("#artist-related-#{type.toLowerCase()} li:nth-child(#{i + 1})")
      view = new FillwidthView
        artworkCollection: @artworkCollection
        doneFetching: true
        collection: artworks
        el: $artistRow.find('.artist-related-artist-artworks')
      view.render()
      new FollowButton
        followArtistCollection: @followArtistCollection
        model: artist
        el: $artistRow.find('.avant-garde-button-white')

      _.defer ->
        view.hideFirstRow()
        view.removeHiddenItems()

  events:
    'click .artist-related-see-more' : 'nextRelatedPage'

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: { page: @["related#{type}Page"]++ }

module.exports.init = ->
  new ArtistView
    model: new Artist sd.ARTIST
    el   : $('body')
