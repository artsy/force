_                         = require 'underscore'
Backbone                  = require 'backbone'
mediator                  = require '../../../lib/mediator.coffee'
CurrentUser               = require '../../../models/current_user.coffee'
FeatureRouter             = require './router.coffee'
SaleArtworkView           = require '../../../components/artwork_item/views/sale_artwork.coffee'
AuctionClockView          = require '../../../components/auction_clock/view.coffee'
trackArtworkImpressions   = require('../../../components/analytics/impression_tracking.coffee').trackArtworkImpressions
Sale                      = require '../../../models/sale.coffee'
CurrentUser               = require '../../../models/current_user.coffee'

artworkColumns        = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate          = -> require('../templates/sets.jade') arguments...
artistsTemplate       = -> require('../templates/artists.jade') arguments...
auctionInfoTemplate   = -> require('../templates/auction_info.jade') arguments...

module.exports = class FeatureView extends Backbone.View
  events:
    'click .auction-info-register-button .avant-garde-button' : 'triggerLoginPopup'

  initialize: (options) ->
    @handleTab options.tab if options.tab
    @setupCurrentUser()
    @model.fetchSets
      success: (sets) =>
        @sets = sets
        @$('#feature-sets-container').html setsTemplate(sets: sets)
        # If we have artworks, we have a sale or auction.
        if @$('.artwork-column').length > 0
          @initializeSale sets

  initializeSale: (sets) ->
    for set in sets
      if set.get('type') is 'auction artworks'
        @sale = new Sale @model.get('sale').toJSON()
        @initializeAuction @sale

      if set.get('type') in ['sale artworks', 'sale auction', 'auction artworks']
        artworks = set.get 'data'
        @setupSaleArtworks artworks, @sale
        if (set and set.get('display_artist_list'))
          @renderArtistList artworks

        @setupArtworkImpressionTracking artworks.models

  initializeAuction: (sale) ->
    $.when.apply(null, _.compact([
      @setupAuctionUser()
      sale.fetch()
    ])).then =>
      @renderAuctionInfo sale

  renderAuctionInfo: (sale) ->
    @$('.feature-auction-info').show().html auctionInfoTemplate
      sale       : sale
      registered : @currentUser?.get('registered_to_bid')?
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

  setupAuctionUser: ->
    return unless @currentUser
    @currentUser.checkRegisteredForAuction
      success: (isRegistered) =>
        @currentUser.set 'registered_to_bid', isRegistered

  setupSaleArtworks: (artworks, sale) ->
    artworks.each (artwork) ->
      new SaleArtworkView
        artworkCollection : @artworkCollection
        el                : @$(".artwork-item[data-artwork='#{artwork.id}']")
        model             : artwork
        sale              : sale
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

  triggerLoginPopup: =>
    unless @currentUser
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to bid on artworks', redirectTo: @sale.registerUrl() }
      false
