sd = require('sharify').data
Backbone = require 'backbone'
FilterView = require './filter.coffee'
bootstrap = require '../../../components/layout/bootstrap.coffee'
AuctionClockView = require '../../../components/auction_clock/view.coffee'
Feature = require '../../../models/feature.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Profile = require '../../../models/profile.coffee'
itemsTemplate = -> require('../templates/items.jade') arguments...
artworkListTemplate = -> require('../../../components/artwork_list/template.jade') arguments...
featuredItemsTemplate = -> require('../../../components/featured_items/template.jade') arguments...
auctionArtworksTemplate = -> require('../../../components/auction_artwork_list/template.jade') arguments...
videoTemplate = -> require('../../../components/video/template.jade') arguments...
auctionDetailTemplate = -> require('../templates/auction_detail.jade') arguments...

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    { @user } = options

    @model.on 'change:sale', =>
      @sale = @model.get 'sale'

    @model.fetchSets
      setsSuccess: (sets) =>
        @sets = sets
        @render()
      artworksSuccess: @doneFetchingSaleArtworks

  isAuction: =>
    @sale?.isAuction()

  render: =>
    if @isAuction() then @renderAuction() else @renderItems()

  doneFetchingSaleArtworks: =>
    artworks = []
    for set in @sets when set.get('type') is 'artworks'
      if @isAuction() and @sale?.isAuctionPromo()
        set.set title: 'Featured works'
      else if @isAuction()
        set.set title: 'Works for bidding on Artsy'
      artworks = set.get('data')
      artworks.on 'filterSort', =>
        @renderArtworkFiltering artworks
      @renderArtworkFiltering artworks

  renderArtworkFiltering: (artworks) ->
    @renderItems()
    @setupArtworkFiltering artworks

  renderAuction: ->
    @$('.js-feature-auction-section').html auctionDetailTemplate(sale: @sale)

    @auctionClockView = new AuctionClockView el: @$('#feature-page-auction-clock'), model: @sale
    @auctionClockView.start()

    @user.registeredForAuction @sale.get('id'), success: (registered) =>
      if not registered and (@sale.get('auction_state') is 'preview')
        @auctionClockView.$el.addClass('feature-auction-section-unregistered')
        @$('#feature-page-auction-register-link').prop('href', @sale.registerUrl(location?.href))

  setupArtworkFiltering: (artworks) ->
    @filterView = new FilterView
      el: @$('.feature-artwork-filter')
      artworks: artworks

    @artworkFilteringSetup = true

  renderItems: =>
    @$('#feature-page-items').html itemsTemplate
      items: @sets
      artworkListTemplate: artworkListTemplate
      featuredItemsTemplate: featuredItemsTemplate
      auctionArtworksTemplate: auctionArtworksTemplate
      videoTemplate: videoTemplate
      isAuction: @isAuction()
      sale: @sale

module.exports.init = ->
  bootstrap()
  new FeatureView
    el: $('body')
    model: new Feature sd.FEATURE
    user: new CurrentUser
