_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
CurrentUser     = require '../../../models/current_user.coffee'
Feature         = require '../../../models/feature.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
artworkColumns  = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate    = -> require('../templates/sets.jade') arguments...
artistsTemplate = -> require('../templates/artists.jade') arguments...

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    @model.fetchSets
      success: (sets) =>
        @sets = sets
        @$('.feature-content').append setsTemplate { sets: sets }
        # If we have artworks, we have a sale or auction.
        if @$('.artwork-column').length > 0
          @initializeSaleArtworks sets

  initializeSaleArtworks: (sets) ->
    # hide it until we add the artist list (should be fast)
    @$('.artwork-column:first-child').parent().css 'visibiliy', 'hidden'
    @$('.artwork-column:first').addClass 'first'
    @$('.artwork-column:last').addClass 'last'
    for set in sets
      if set.get('type') in ['sale artworks', 'sale auction', 'auction artworks']
        artworks = set.get 'data'
        @setupSaleArtworks artworks
        if (set and set.get('display_artist_list'))
          @renderArtistList artworks

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
    @$('.artwork-column:first-child').parent().css 'visibiliy', 'visible'

module.exports.init = ->

  new FeatureView
    el   : $('#feature')
    model: new Feature sd.FEATURE
