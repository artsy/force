_ = require 'underscore'
Backbone = require 'backbone'
{ trackArtworkImpressions } = require '../../../components/analytics/impression_tracking.coffee'
mediator = require '../../../lib/mediator.coffee'
Artworks = require '../../../collections/artworks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
FeatureRouter = require './router.coffee'
ClockView = require '../../../components/clock/view.coffee'
ShareView = require '../../../components/share/view.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
artworkColumns = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate = -> require('../templates/sets.jade') arguments...

module.exports = class FeatureView extends Backbone.View
  events:
    'click .js-register-button': 'authOrPass'

  initialize: (options = {}) ->
    @setupCurrentUser()

    @feature = @model

    # Make the sale available as soon as possible
    @feature.on 'change:sale', =>
      @sale = @feature.get 'sale'

      if @isAuction()
        @redirectToAuction()
      else
        $('head').append '<meta property="og:event" content="sale">'
        @$el.attr 'data-type', 'sale'

    @feature.fetchSets
      setsSuccess: (sets) =>
        @$('#feature-sets-container').html setsTemplate(sets: sets)
      artworkPageSuccess: @artworkPageSuccess
      artworksSuccess: @doneFetchingSaleArtworks

    @setupShareButtons()

  redirectToAuction: ->
    if @isAuction()
      window.location = @sale.href() # Redirect to the dedicated auction pages

  artworkPageSuccess: (fullCollection, newSaleArtworks) =>
    return if @isAuction()

    artworks = Artworks.fromSale(new Backbone.Collection newSaleArtworks)

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

  setupArtworkImpressionTracking: (artworks) ->
    trackArtworkImpressions artworks, @$el

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

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
