_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
FeatureRouter = require './router.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
ClockView = require '../../../components/clock/view.coffee'
{ trackArtworkImpressions } = require '../../../components/analytics/impression_tracking.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
AuctionArtworksView = require '../../../components/auction_artworks/view.coffee'
artworkColumns = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate = -> require('../templates/sets.jade') arguments...
auctionMetadataTemplate = -> require('../templates/auction_metadata.jade') arguments...

module.exports = class FeatureView extends Backbone.View
  events:
    'click .js-register-button': 'authOrPass'

  initialize: (options = {}) ->
    @setupCurrentUser()

    @feature = @model

    # Make the sale available as soon as possible
    @feature.on 'change:sale', =>
      @sale = @feature.get 'sale'
      type = if @isAuction() then 'auction' else 'sale'
      $('head').append("<meta property='og:event' content='#{type}'>")
      @$el.attr 'data-type', type

    @feature.fetchSets
      setsSuccess: (sets) =>
        @sets = sets
        @$('#feature-sets-container').html setsTemplate(sets: @sets)
        @initializeSale @sets
      artworkPageSuccess: @artworkPageSuccess
      artworksSuccess: @doneFetchingSaleArtworks

    @setupShareButtons()

  artworkPageSuccess: (fullCollection, newSaleArtworks) =>
    artworks = Artworks.fromSale(new Backbone.Collection newSaleArtworks)

    if @isAuction()
      # Setup or append to the auction artworks view
      if @auctionArtworks?
        @auctionArtworks.add artworks.models
      else
        view = new AuctionArtworksView
          model: @sale
          collection: @auctionArtworks = artworks
          user: @currentUser
        @$('#feature-artworks').html view.render().$el

    else # Is a non-auction sale
      # Setup setup the columns view
      unless @artworkColumns?
        @artworkColumns = new ArtworkColumnsView
          el: @$('#feature-artworks')
          collection: new Artworks
          displayPurchase: true
          setHeight: 400
          gutterWidth: 0
          showBlurbs: true
          isAuction: false
      # Always append
      @appendArtworks artworks

  isAuction: =>
    @sale?.isAuction()

  doneFetchingSaleArtworks: (saleFeaturedSet) =>
    artworks = saleFeaturedSet.get 'data'
    @setupArtworkImpressionTracking artworks.models

  appendArtworks: (artworks) ->
    @artworkColumns.appendArtworks artworks.models
    @setupSaleArtworks artworks, @sale

  initializeSale: (sets) ->
    saleSets = _.filter sets, (set) -> set.get('item_type') is 'Sale'
    for set in saleSets
      @initializeAuction @sale, set if @isAuction()

  initializeAuction: (sale, set) ->
    $.when.apply(null, _.compact([
      @setupAuctionUser sale
      sale.fetch()
    ])).then =>
      @renderAuctionMetadata sale

  renderAuctionMetadata: (sale) ->
    @$('.js-feature-metadata')
      .html auctionMetadataTemplate
        sale: sale
        registered: @currentUser?.get('registered_to_bid')

    @clock = new ClockView el: @$('.js-auction-clock'), model: sale, modelName: 'Auction'
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
        currentUser: @currentUser
        el: @$(".artwork-item[data-artwork='#{artwork.id}']")
        model: artwork
        sale: sale

    if @artworkCollection
      @artworkCollection.addRepoArtworks artworks
      @artworkCollection.syncSavedArtworks()

  setupShareButtons: ->
    new ShareView el: @$('.js-feature-share')

  authOrPass: (e) =>
    unless @currentUser
      e.preventDefault()
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to bid on artworks'
        redirectTo: @sale.registerUrl()
