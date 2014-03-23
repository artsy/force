_                     = require 'underscore'
sd                    = require('sharify').data
Backbone              = require 'backbone'
ShareView             = require './share.coffee'
Transition            = require '../../../components/mixins/transition.coffee'
CurrentUser           = require '../../../models/current_user.coffee'
SaveButton            = require '../../../components/save_button/view.coffee'
RelatedPostsView      = require '../../../components/related_posts/view.coffee'
analytics             = require '../../../lib/analytics.coffee'
acquireArtwork        = require('../../../components/acquire/view.coffee').acquireArtwork
FeatureNavigationView = require './feature-navigation.coffee'
BelowTheFoldView      = require './below-the-fold.coffee'
trackArtworkImpressions = require("../../../components/analytics/impression_tracking.coffee").trackArtworkImpressions
MonocleView           = require './monocles.coffee'

artistArtworksTemplate  = -> require('../templates/_artist-artworks.jade') arguments...
detailTemplate          = -> require('../templates/_detail.jade') arguments...

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class ArtworkView extends Backbone.View
  events:
    'click a[data-client]'                  : 'intercept'
    'click .circle-icon-button-share'       : 'openShare'
    'click .circle-icon-button-save'        : 'saveArtwork'
    'click .artwork-additional-image'       : 'changeImage'
    'click .artwork-download-button'        : 'trackDownload'
    'click .artwork-auction-results-button' : 'trackComparable'
    'change .aes-radio-button'              : 'selectEdition'
    'click .artwork-buy-button'             : 'buy'

  initialize: (options) ->
    { @artwork, @artist } = options

    @setupRelatedPosts()
    @setupCurrentUser()
    @setupArtistArtworks()
    @setupFollowButton()
    @setupBelowTheFold()
    @setupMainSaveButton()

    # Handle all related content
    @setupRelatedLayers()
    @on 'related:features', (feature) ->
      @setupFeatureNavigation model: feature, kind: 'feature'
    @on 'related:fairs', (fair) ->
      @belowTheFoldView.setupFair fair
      @setupFeatureNavigation model: fair, kind: 'fair'
      # Remove after ADAA is over on 03/09/2014
      @handleAdaaAuctionResults fair
      @deltaTrackPageView fair
    @on 'related:sales', (sale) ->
      @belowTheFoldView.setupSale sale, @saved
    @on 'related:none', ->
      @belowTheFoldView.setupLayeredSearch()

    if @currentUser?.hasLabFeature('Monocles')
      @setupMonocleView()
    # Re-fetch and update detail
    @artwork.on "change:sale_message", @renderDetail, this
    @artwork.fetch()

  handleAdaaAuctionResults: (fair) ->
    if fair.get('id') == 'adaa-the-art-show-2014'
      $('.artwork-auction-results-button').remove()

  deltaTrackPageView: (fair) ->
    el = $('#scripts')
    analytics.delta('fair_artist_view',
                    fair: fair.get('_id'),
                    id: @artist.get('_id'),
                    el)
    analytics.delta('fair_partner_view',
                    fair: fair.get('_id'),
                    id: @artwork.get('partner')._id,
                    el)

  setupRelatedLayers: ->
    $.when.apply(null, @artwork.fetchRelatedCollections()).then =>
      # Find the first related collection that has any results
      relatedCollections = _.filter @artwork.relatedCollections, (xs) -> xs.length
      if relatedCollections.length
        for relatedCollection in relatedCollections
          # Trigger an event and pass on the first result
          @trigger "related:#{relatedCollection.kind}", relatedCollection.first()
      else
        @trigger 'related:none'

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @saved      = @currentUser?.defaultArtworkCollection()
    @following  = new Following(null, kind: 'artist') if @currentUser?

  setupArtistArtworks: ->
    return unless @artist?.get('artworks_count') > 1
    @listenTo @artist.artworks, 'sync', @renderArtistArtworks
    @artist.artworks.fetch data: size: 5, published: true

  renderArtistArtworks: ->
    # Ensure the current artwork is not in the collection
    @artist.artworks.remove @artwork
    return unless @artist.artworks.length
    @$('.artwork-artist').attr 'data-state', 'complete'
    @$('#artwork-artist-artworks-container').
      addClass('is-loaded').
      html(artistArtworksTemplate artworks: @artist.artworks)

    @setupArtistArtworkSaveButtons @artist.artworks

    trackArtworkImpressions @artist.artworks.models, @$('#artwork-artist-artworks-container')

  renderDetail: ->
    @$('.artwork-detail').html detailTemplate
      artwork:  @artwork
      artist:   @artist
      user:     @currentUser
      sd:       require('sharify').data
    @followButton.setElement @$('.artwork-artist-follow-button')
    @following?.syncFollows [@artist.id]

  setupArtistArtworkSaveButtons: (artworks) ->
    return unless artworks.length > 0
    _.defer =>
      for artwork in artworks.models
        @setupSaveButton @$(".overlay-button-save[data-id='#{artwork.id}']"), artwork
      @syncSavedArtworks artworks

  # @param {Object or Array or Backbone.Collection}
  syncSavedArtworks: (artworks) ->
    return unless @saved
    @__saved__ ?= new Backbone.Collection
    @__saved__.add artworks?.models or artworks
    @saved.addRepoArtworks @__saved__
    @saved.syncSavedArtworks()

  setupRelatedPosts: ->
    new RelatedPostsView
      el: @$('#artwork-artist-related-posts-container')
      numToShow: 2
      model: @artwork
      modelName: 'artwork'

  setupFeatureNavigation: (options) ->
    new FeatureNavigationView
      model: options.model
      kind: options.kind
      artwork: @artwork
      el: @$('#artwork-feature-navigation')

  setupBelowTheFold: ->
    @belowTheFoldView = new BelowTheFoldView
      artwork: @artwork
      el: @$('#artwork-below-the-fold-section')

  setupMainSaveButton: ->
    @setupSaveButton @$('.circle-icon-button-save'), @artwork
    @syncSavedArtworks @artwork

  setupSaveButton: ($el, artwork, options = {}) ->
    new SaveButton
      analyticsSaveMessage: 'Added artwork to collection, via artwork info'
      analyticsUnsaveMessage: 'Removed artwork from collection, via artwork info'
      el: $el
      saved: @saved
      model: artwork

  setupFollowButton: ->
    @followButton = new FollowButton
      analyticsFollowMessage: 'Followed artist, via artwork info'
      analyticsUnfollowMessage: 'Unfollowed artist, via artwork info'
      el: @$('.artwork-artist-follow-button')
      following: @following
      modelName: 'artist'
      model: @artist
    @following?.syncFollows [@artist.id]

  setupMonocleView: ->
    @$('.artwork-image').append("<div class='monocle-zoom'></div>")
    url = @artwork.url() + '/image/' + @artwork.defaultImage().get('id') + '/larger.jpg'
    @$('.monocle-zoom').css('background-image', "url(#{url})")
    new MonocleView
      artwork: @artwork
      el: @$('.artwork-image')

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
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true, replace: true

  openShare: (e) ->
    e.preventDefault()
    analytics.track.click 'Viewed sharing_is_caring form'
    new ShareView width: '350px', artwork: @artwork

  changeImage: (e) ->
    e.preventDefault()

    (@$artworkAdditionalImages ?= @$('.artwork-additional-image')).
      removeClass 'is-active'
    ($target = $(e.currentTarget)).
      addClass 'is-active'
    (@$artworkImage ?= @$('#the-artwork-image')).
      attr('src', $target.data 'href')

    @artwork.setActiveImage($target.data 'id')

  trackDownload: ->
    analytics.track.click 'Downloaded lo-res image'

  trackComparable: ->
    analytics.track.click "Viewed 'Comparables'"

  selectEdition: (e) ->
    @__selectedEdition__ = e.currentTarget.value

  selectedEdition: ->
    @__selectedEdition__ or
    @artwork.editions.first()?.id

  buy: (e) ->
    ($target = $(e.currentTarget)).addClass 'is-loading'
    acquireArtwork @artwork, $target, @selectedEdition()
