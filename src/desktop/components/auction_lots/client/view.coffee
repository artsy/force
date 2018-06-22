Backbone = require 'backbone'
zoom = require '../../../components/zoom/index.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ isTouchDevice } = require '../../../components/util/device.coffee'
FillwidthView = require '../../../components/fillwidth_row/view.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

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
    mediator.trigger 'open:auth',
      mode: 'signup',
      copy: 'Sign up to see full auction records — for free'
      trigger: 'click'
      intent: 'view auction results'
      destination: location.href

  onRowClick: (e) =>
    return if @user
    e.stopPropagation()
    @signUp(e)

  # Handle links with the data-client attribute via pushState
  intercept: (e) =>
    return @onDetailClick(e) if @onDetailClick
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true
