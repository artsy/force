_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
artworkColumns = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate = -> require('../templates/sets.jade') arguments...

module.exports = class FeatureView extends Backbone.View
  initialize: (options = {}) ->
    # Make the sale available as soon as possible
    @model.on 'change:sale', =>
      @sale = @model.get 'sale'
      if @isAuction()
        # Redirect to the dedicated auction pages
        @redirectToAuction()

     @model.fetchSets
      setsSuccess: (sets) =>
        @$('#feature-sets-container').html setsTemplate(sets: sets)
      artworkPageSuccess: @artworkPageSuccess
      artworksSuccess: @doneFetchingSaleArtworks

    @setupShareButtons()

  redirectToAuction: ->
    if @isAuction()
      window.location = @sale.href() # Redirect to the dedicated auction pages

  artworkPageSuccess: (fullCollection, newSaleArtworks) =>
    return if @sale?.isAuction()

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
        context_page: 'Feature page'

    # Always append
    @appendArtworks artworks

  isAuction: =>
    @sale?.isAuction()

  doneFetchingSaleArtworks: (saleFeaturedSet) =>
    artworks = saleFeaturedSet.get 'data'

  appendArtworks: (artworks) ->
    @artworkColumns.appendArtworks artworks.models
    @setupSaleArtworks artworks, @sale

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
        context_page: 'Feature page'

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
