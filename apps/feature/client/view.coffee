_                         = require 'underscore'
Backbone                  = require 'backbone'
mediator                  = require '../../../lib/mediator.coffee'
CurrentUser               = require '../../../models/current_user.coffee'
FeatureRouter             = require './router.coffee'
FilterView                = require './filter.coffee'
SaleArtworkView           = require '../../../components/artwork_item/views/sale_artwork.coffee'
AuctionClockView          = require '../../../components/auction_clock/view.coffee'
trackArtworkImpressions   = require('../../../components/analytics/impression_tracking.coffee').trackArtworkImpressions
Sale                      = require '../../../models/sale.coffee'
CurrentUser               = require '../../../models/current_user.coffee'
ArtworkColumnsView        = require '../../../components/artwork_columns/view.coffee'
Artworks                  = require '../../../collections/artworks.coffee'
ShareView                 = require '../../../components/share/view.coffee'

artworkColumns                  = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate                    = -> require('../templates/sets.jade') arguments...
artistsTemplate                 = -> require('../templates/artists.jade') arguments...
auctionRegisterButtonTemplate   = -> require('../templates/auction_register_button.jade') arguments...
auctionCountdownTemplate        = -> require('../templates/auction_countdown.jade') arguments...
filterTemplate                  = -> require('../templates/artwork_filter.jade') arguments...

module.exports = class FeatureView extends Backbone.View

  events:
    'click .auction-info-register-button .avant-garde-button-black' : 'triggerLoginPopup'
    'click .featured-set-artist-expand'                             : 'seeAllArtists'

  maxArtists: 60
  minArtworksForFilter: 10

  initialize: (options) ->
    @handleTab options.tab if options.tab

    @setupCurrentUser()

    @feature = @model

    # Make the sale available as soon as possible
    @feature.on 'change:sale', => @sale = @feature.get 'sale'

    @feature.fetchSets
      setsSuccess: (sets) =>
        @sets = sets
        @$('#feature-sets-container').html setsTemplate(sets: @sets)
        @initializeSale @sets
      artworkPageSuccess: (fullCollection, newSaleArtworks) =>
        @appendArtworks newSaleArtworks
      artworksSuccess: (saleFeaturedSet) =>
        @setupArtworks saleFeaturedSet
        if saleFeaturedSet.get('data')?.length > @minArtworksForFilter
          @setupArtworkFiltering saleFeaturedSet.get('data')

    @setupShareButtons()

  setupArtworkFiltering: (artworks) ->
    @$('#feature-artworks').before filterTemplate()

    new FilterView
      el: @$('.feature-artwork-filter')
      artworks: artworks
      startingSearch: 'artist-a-to-z'
      reRender: (artworks) =>
        @$('#feature-artworks').html ''
        @artworkColumns = undefined
        @appendArtworks artworks, true
        @renderArtistList artworks

  appendArtworks: (artworks, skipArtworkFormatting) ->
    @artworkColumns ?= new ArtworkColumnsView
      el              : @$('#feature-artworks')
      collection      : new Artworks
      displayPurchase : true
      setHeight       : 400
      gutterWidth     : 0
      showBlurbs      : true
      isAuction       : @sale.isAuction()

    unless skipArtworkFormatting
      artworks = Artworks.fromSale(new Backbone.Collection artworks)
    @artworkColumns.appendArtworks artworks.models
    @setupSaleArtworks artworks, @sale

  initializeSale: (sets) ->
    saleSets = _.filter sets, (set) -> set.get('item_type') is 'Sale'
    for set in saleSets
      @initializeAuction @sale, set if @sale.isAuction()

  setupArtworks: (set) ->
    artworks = set.get 'data'
    @renderArtistList artworks if set and set.get('display_artist_list')
    @setupArtworkImpressionTracking artworks.models

  initializeAuction: (sale, set) ->
    $.when.apply(null, _.compact([
      @setupAuctionUser sale
      sale.fetch()
    ])).then =>
      @renderAuctionInfo sale

  renderAuctionInfo: (sale) ->
    @$('#feature-description-register-container').html auctionRegisterButtonTemplate
      sale       : sale
      registered : @currentUser?.get('registered_to_bid')?
    @$('#feature-auction-info-countdown-container').html auctionCountdownTemplate(sale: sale)
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

  setupAuctionUser: (sale) ->
    return unless @currentUser
    @currentUser.checkRegisteredForAuction
      saleId: sale.get('id')
      success: (isRegistered) =>
        @currentUser.set 'registered_to_bid', isRegistered

  setupSaleArtworks: (artworks, sale) ->
    artworks.each (artwork) =>
      new SaleArtworkView
        currentUser       : @currentUser
        artworkCollection : @artworkCollection
        el                : @$(".artwork-item[data-artwork='#{artwork.id}']")
        model             : artwork
        sale              : sale
    if @artworkCollection
      @artworkCollection.addRepoArtworks artworks
      @artworkCollection.syncSavedArtworks()

  setupShareButtons: -> new ShareView el: @$('.feature-share')

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

    return unless artworks.length

    n = Math.floor artworks.length/2
    n = 1 if n < 1

    lists = _.groupBy(artworks, (a, b) -> Math.floor(b/n))
    artworkGroups = _.toArray(lists)

    # fix uneven lists
    if artworkGroups.length > 2
      artworkGroups[0].push artworkGroups.pop(2)[0]

    $lastColumn = @$('.artwork-column:last-of-type')
    $lastColumn.prepend artistsTemplate(
      artworkGroups: artworkGroups
      artistListTruncated: artworks.length > @maxArtists
    )
    @$('.artwork-column').parent().css 'visibility', 'visible'

    # Rebalance columns now that the artist list has been added
    @artworkColumns.rebalance(@$('.feature-set-item-artist-list').css('height').replace('px',''), $lastColumn.index())

  seeAllArtists: (e) ->
    @$('.artist-list-truncated').removeClass('artist-list-truncated')
    $(e.target).remove()

  handleTab: (tab) ->
    new FeatureRouter feature: @feature
    Backbone.history.start pushState: true

  triggerLoginPopup: =>
    unless @currentUser
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to bid on artworks', redirectTo: @sale.registerUrl() }
      false
