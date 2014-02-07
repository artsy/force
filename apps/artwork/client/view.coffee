Backbone      = require 'backbone'
ShareView     = require './share.coffee'
Transition    = require '../../../components/mixins/transition.coffee'
CurrentUser   = require '../../../models/current_user.coffee'
SaveButton  = require '../../../components/save_button/view.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class ArtworkView extends Backbone.View
  events:
    'click a[data-client]'                : 'intercept'
    'click .circle-icon-button-share'     : 'openShare'
    'click .circle-icon-button-save'      : 'saveArtwork'
    'click .artwork-additional-image'     : 'changeImage'

  initialize: (options) ->
    { @artwork, @artist } = options

    @setupCurrentUser()
    @setupFollowButton()
    @setupSaveButton()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @saved      = @currentUser?.defaultArtworkCollection()
    @following  = new Following(null, kind: 'artist') if @currentUser?

  route: (route) ->
    # Initial server rendered route is 'show'
    # No transition unless it's happening client-side
    return if @$el.attr('data-route') is route

    @$el.attr 'data-route-pending', (@__route__ = route)

    Transition.fade @$el,
      duration: 250
      out: =>
        @$el.attr 'data-route', @__route__

  # Handle links with the data-client attribute via pushState
  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), true

  openShare: (e) ->
    e.preventDefault()
    new ShareView width: '350px', artwork: @artwork

  saveArtwork: (e) ->
    e.preventDefault()

  setupFollowButton: ->
    @followButton = new FollowButton
      el: @$('.artwork-artist-follow-button')
      following: @following
      model: @artist

    @following?.syncFollows [@artist.id]

  setupSaveButton: ->
    new SaveButton
      analyticsSaveMessage: 'Added artwork to collection, via artwork info'
      analyticsUnsaveMessage: 'Removed artwork from collection, via artwork info'
      el: @$('.circle-icon-button-save')
      saved: @saved
      model: @artwork

    if @saved
      @saved.addRepoArtworks new Backbone.Collection @artwork
      @saved.syncSavedArtworks()

  changeImage: (e) ->
    e.preventDefault()

    (@$artworkAdditionalImages ?= @$('.artwork-additional-image')).
      removeClass 'is-active'

    ($target = $(e.currentTarget)).
      addClass 'is-active'

    (@$artworkImage ?= @$('#the-artwork-image')).
      attr('src', $target.data 'href')

    @artwork.setActiveImage($target.data 'id')
