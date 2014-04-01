_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
CurrentUser     = require '../../../models/current_user.coffee'
Feature         = require '../../../models/feature.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
artworkColumns  = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate    = -> require('../templates/sets.jade') arguments...
artistsTemplate = -> require('../templates/artists.jade') arguments...
auctionInfoTemplate = -> require('../templates/auction_info.jade') arguments...
analytics       = require("../../../lib/analytics.coffee")
mediator        = require '../../../lib/mediator.coffee'
trackArtworkImpressions = require("../../../components/analytics/impression_tracking.coffee").trackArtworkImpressions

mediator          = require '../../../lib/mediator.coffee'

AuctionClockView  = require '../../../components/auction_clock/view.coffee'
Sale              = require '../../../models/sale.coffee'
CurrentUser       = require '../../../models/current_user.coffee'

ConfirmBidModal          = require '../../../components/credit_card/client/confirm_bid.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'

module.exports = class FeatureRouter extends Backbone.Router

  routes:
    'feature/:id/confirm-bid'         : 'confirmBid'
    'feature/:id/confirm-registration': 'confirmRegistration'

  initialize: (options) ->
    @feature = options.feature
    @currentUser = CurrentUser.orNull()

  fetchUser: (success) =>
    @currentUser.fetch
      success: success

  confirmBid: ->
    @fetchUser =>
      new ConfirmBidModal feature: @feature, paddleNumber: @currentUser.get('paddle_number')
      mediator.on 'modal:closed', => Backbone.history.navigate(@feature.href(), trigger: true, replace: true)
      analytics.track.click "Showed 'Confirm bid' on feature page"

  confirmRegistration: ->
    @fetchUser =>
      new ConfirmRegistrationModal feature: @feature, paddleNumber: @currentUser.get('paddle_number')
      mediator.on 'modal:closed', => Backbone.history.navigate(@feature.href(), trigger: true, replace: true)
      analytics.track.click "Showed 'Confirm registration' on feature page"

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    @handleTab(options.tab) if options.tab
    @model.fetchSets
      success: (sets) =>
        @sets = sets
        @$('#feature-sets-container').html setsTemplate(sets: sets)
        # If we have artworks, we have a sale or auction.
        if @$('.artwork-column').length > 0
          @initializeSale sets

  initializeSale: (sets) ->
    for set in sets
      if set.get('type') in ['sale artworks', 'sale auction', 'auction artworks']
        artworks = set.get 'data'
        @setupSaleArtworks artworks
        if (set and set.get('display_artist_list'))
          @renderArtistList artworks

        @setupArtworkImpressionTracking artworks.models

      if set.get('type') is 'auction artworks'
        @initializeAuction @model.get('sale')

  initializeAuction: (sale) ->
    new Sale(id: sale.get('id')).fetch
      success: (sale) =>
        @sale = sale
        if sale.get('is_auction')
          if @currentUser
            @currentUser.checkRegisteredForAuction
              success: (isRegistered) =>
                @renderAuctionInfo sale, isRegistered
          else
            @renderAuctionInfo sale, false

  renderAuctionInfo: (sale, registered) ->
    @$('.feature-auction-info').show().html auctionInfoTemplate(
      sale: sale
      registered: registered
    )
    @setupAuctionClock sale

  setupAuctionClock: (sale) ->
    @clock = new AuctionClockView
      modelName : 'Auction'
      model     : sale
      el        : @$('.auction-info-countdown')
    @clock.start()

  setupArtworkImpressionTracking: (artworks) ->
    trackArtworkImpressions artworks, @$el

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  setupSaleArtworks: (artworks) ->
    @setupCurrentUser()
    for artwork in artworks.models
      new SaleArtworkView
        artworkCollection: @artworkCollection
        el               : @$(".artwork-item[data-artwork='#{ artwork.get('id') }']")
        model            : artwork
    if @artworkCollection
      @artworkCollection.addRepoArtworks artworks
      @artworkCollection.syncSavedArtworks()

  getArtworksOrderedByArtist: (collection) ->
    collection.comparator = (model) -> model.get('artist')?.sortable_id
    collection.sort()
    collection.models

  uniqueArtworksByArtist: (artworks) ->
    artists = {}
    artworks.filter (artwork) ->
      return false if artists[artwork.get('artist').id]
      artists[artwork.get('artist').id] = true
      true

  renderArtistList: (artworks) ->
    artworks = @getArtworksOrderedByArtist artworks
    artworks = @uniqueArtworksByArtist artworks

    n = Math.floor artworks.length/2
    n = 1 if n < 1

    lists = _.groupBy(artworks, (a, b) -> Math.floor(b/n))
    artworkGroups = _.toArray(lists)

    # fix uneven lists
    if artworkGroups.length > 2
      artworkGroups[0].push artworkGroups.pop(2)[0]

    @$('.artwork-column:last-of-type').prepend artistsTemplate { artworkGroups: artworkGroups }
    @$('.artwork-column').parent().css 'visibility', 'visible'

  handleTab: (tab) ->
    new FeatureRouter feature: @model
    Backbone.history.start pushState: true

  events:
    "click .auction-info-register-button .avant-garde-button" : 'triggerLoginPopup'

  triggerLoginPopup: =>
    unless @currentUser
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to bid on artworks', redirectTo: @sale.registerUrl() }
      false

module.exports.init = ->
  new FeatureView
    el   : $('#feature')
    model: new Feature sd.FEATURE
    tab  : sd.TAB
