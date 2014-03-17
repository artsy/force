Backbone            = require 'backbone'
ZoomView            = require '../../../components/modal/zoom.coffee'
mediator            = require '../../../lib/mediator.coffee'
CurrentUser         = require '../../../models/current_user.coffee'
{ isTouchDevice }   = require '../../../components/util/device.coffee'
FillwidthView       = require '../../../components/fillwidth_row/view.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class AuctionResultsView extends Backbone.View
  events:
    'click .auction-lot-image-zoom'         : 'zoomImage'
    'click .auction-lot-sale-signup'        : 'signUp'
    'click .auction-lots-feedback-link'     : 'feedback'
    'click .auction-lot'                    : 'onRowClick'
    'click a[data-client]'                  : 'intercept'

  initialize: (options) ->
    { @artist, @artworks } = options

    @touchAdjustments() if isTouchDevice()

    @user = CurrentUser.orNull()

    @setupArtworks()
    @setupFollowButton()

  setupArtworks: ->
    @user?.initializeDefaultArtworkCollection()
    @saved = @user?.defaultArtworkCollection()
    @artworksView = new FillwidthView
      artworkCollection: @saved
      collection: @artworks
      seeMore: false
      el: $('#ara-artworks')
    @artworksView.render()
    @artworksView.hideFirstRow()

  setupFollowButton: ->
    if @user
      @following = new Following null, kind: 'artist'
    new FollowButton
      analyticsFollowMessage: 'Followed artist, via auction result'
      analyticsUnfollowMessage: 'Unfollowed artist, via auction result'
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
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signUp: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'register', copy: 'Sign up to see full auction records — for free'

  feedback: (e) ->
    e.preventDefault()
    mediator.trigger 'open:feedback'

  onRowClick: (e) ->
    return if @user
    e.stopPropagation()
    @signUp(e)

  # Handle links with the data-client attribute via pushState
  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true
