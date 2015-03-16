_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ShareView = require '../../../components/share/view.coffee'
{ trackArtworkImpressions } = require '../../../components/analytics/impression_tracking.coffee'
artworkColumns = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate = -> require('../templates/sets.jade') arguments...
artistsTemplate = -> require('../templates/artists.jade') arguments...

module.exports = class FeatureView extends Backbone.View
  maxArtists: 60

  events:
    'click .featured-set-artist-expand': 'seeAllArtists'

  initialize: (options) ->
    @setupCurrentUser()
    @feature = @model

    # Make the sale available as soon as possible
    @listenTo @feature, 'change:sale', =>
      @sale = @feature.get 'sale'
      @updateMetaType()
      # Just in case, redirect if this is an auction
      if @isAuction()
        window.location = "/auction/#{@sale.id}"

    @feature.fetchSets
      setsSuccess: (sets) =>
        @$('#feature-sets-container').html setsTemplate(sets: @sets = sets)
      artworkPageSuccess: @artworkPageSuccess
      artworksSuccess: @doneFetchingSaleArtworks

    @setupShareButtons()

  artworkPageSuccess: (fullCollection, newSaleArtworks) =>
    @createArtworkColumns()
    artworks = Artworks.fromSale(new Backbone.Collection newSaleArtworks)
    @appendArtworks artworks

  isAuction: =>
    @sale?.isAuction()

  doneFetchingSaleArtworks: (saleFeaturedSet) =>
    @setupArtworks saleFeaturedSet

    @artworks = saleFeaturedSet.get('data')

    @artworks.on 'filterSort', =>
      @$('#feature-artworks').html ''
      @artworkColumns.undelegateEvents()
      @artworkColumns = undefined

      @createArtworkColumns()
      @appendArtworks @artworks
      @renderArtistList @artworks if saleFeaturedSet and saleFeaturedSet.get('display_artist_list')

  updateMetaType: ->
    type = if @isAuction() then 'auction' else 'sale'
    $('head').append("<meta property='og:event' content='#{type}'>")

  createArtworkColumns: ->
    @artworkColumns ?= new ArtworkColumnsView
      el: @$('#feature-artworks')
      collection: new Artworks
      displayPurchase: true
      setHeight: 400
      gutterWidth: 0
      showBlurbs: true
      isAuction: @isAuction()

  appendArtworks: (artworks) ->
    @artworkColumns.appendArtworks artworks.models
    @setupSaleArtworks artworks, @sale

  setupArtworks: (set) ->
    artworks = set.get 'data'
    @setupArtworkImpressionTracking artworks.models

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
    new ShareView el: @$('.feature-share')

  getArtworksOrderedByArtist: (collection) ->
    collection.comparator = (model) -> model.get('artist')?.sortable_id
    collection.sort()
    collection.models

  uniqueArtworksByArtist: (artworks) ->
    artists = {}
    artworks.filter (artwork) ->
      artistId = artwork.get('artist')?.id
      return false unless artistId
      return false if artists[artistId]
      artists[artistId] = true
      true

  renderArtistList: (artworks) ->
    artworks = @getArtworksOrderedByArtist(artworks)
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
    @artworkColumns.rebalance(@$('.feature-set-item-artist-list').css('height')?.replace('px',''), $lastColumn.index())

  seeAllArtists: (e) ->
    @$('.artist-list-truncated').removeClass('artist-list-truncated')
    $(e.currentTarget).remove()
