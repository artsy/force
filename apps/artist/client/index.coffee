_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../collections/artworks.coffee'
Artist                  = require '../../../models/artist.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
ArtistFillwidthList     = require '../../../components/artist_fillwidth_list/view.coffee'
BlurbView               = require './blurb.coffee'
RelatedPostsView        = require '../../../components/related_posts/view.coffee'
RelatedGenesView        = require './genes.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowArtistCollection  = require '../../../models/follow_artist_collection.coffee'
FollowButton            = require './follow_button.coffee'
ShareView               = require '../../../components/share/view.coffee'
AuctionLots             = require '../../../collections/auction_lots.coffee'
BorderedPulldown        = require '../../../components/bordered_pulldown/view.coffee'
artistSort              = -> require('../templates/sort.jade') arguments...

module.exports.ArtistView = class ArtistView extends Backbone.View

  initialize: (options) ->
    @sortBy = options.sortBy
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
    new BorderedPulldown el: $('.bordered-pulldown')

    # Available Works
    $availableWorks = @$('#artist-available-works')
    @availableArtworks = new Artworks
    @availableArtworks.url = @model.url() + '/artworks'
    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'for_sale', 'sort': @sortBy or undefined }
      collection: @availableArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $availableWorks
    ).nextPage(false, 10)

    # Works at Museums/Institutions
    $institutionalWorks = @$('#artist-institution-works')
    @institutionArtworks = new Artworks
    @institutionArtworks.url = @model.url() + '/artworks'
    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'not_for_sale', 'sort': @sortBy or undefined }
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
    if @model["related#{type}"]?.models.length > 0
      new ArtistFillwidthList(
        el: @$("#artist-related-#{type.toLowerCase()}")
        collection: @model["related#{type}"]
        user: @currentUser
      ).fetchAndRender()
    else
      $artistContainer.parent().remove()

  events:
    'click .artist-related-see-more'    : 'nextRelatedPage'
    'click .artist-works-sort a'        : 'onSortChange'

  onSortChange: (e) ->
    @sortBy = $(e.currentTarget).data('sort')
    @setupArtworks()

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: { page: @["related#{type}Page"]++ }

module.exports.init = ->
  new ArtistView
    model  : new Artist sd.ARTIST
    el     : $('body')
    sortBy : sd.sortBy
