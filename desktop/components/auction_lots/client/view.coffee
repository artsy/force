Backbone = require 'backbone'
zoom = require '../../../components/zoom/index'
mediator = require '../../../lib/mediator'
CurrentUser = require '../../../models/current_user'
{ isTouchDevice } = require '../../../components/util/device'
FillwidthView = require '../../../components/fillwidth_row/view'

{ Following, FollowButton } = require '../../../components/follow_button/index'

module.exports = class AuctionResultsView extends Backbone.View
  events:
    'click .auction-lot-image-zoom': 'zoomImage'
    'click .auction-lot-sale-signup': 'signUp'
    'click .auction-lot': 'onRowClick'
    'click a[data-client]': 'intercept'

  initialize: (options) ->
    { @artist, @artworks, @onDetailClick } = options

    @touchAdjustments() if isTouchDevice()

    @user = CurrentUser.orNull()

    @setupArtworks() if @artworks?.length
    @setupFollowButton()

  setupArtworks: ->
    @user?.initializeDefaultArtworkCollection()
    @saved = @user?.defaultArtworkCollection()
    @artworksView = new FillwidthView
      artworkCollection: @saved
      collection: @artworks
      seeMore: false
      el: @$('#ara-artworks')
    @artworksView.render()
    @artworksView.hideSecondRow()

  setupFollowButton: ->
    if @user
      @following = new Following null, kind: 'artist'
    new FollowButton
      context_page: "Auction results"
      el: @$('#ara-follow-button')
      following: @following
      modelName: 'artist'
      model: @artist
    @following?.syncFollows [@artist.id]

  touchAdjustments: ->
    @$('.bordered-pulldown').on 'click', ->
      $(this).trigger 'hover'

  zoomImage: (e) ->
    e.preventDefault()
    zoom $(e.currentTarget).attr('href')

  signUp: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'register', copy: 'Sign up to see full auction records — for free'

  onRowClick: (e) =>
    return if @user
    e.stopPropagation()
    @signUp(e)

  # Handle links with the data-client attribute via pushState
  intercept: (e) =>
    return @onDetailClick(e) if @onDetailClick
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true
