_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
SuggestedGenesView = require '../../../components/suggested_genes/view.coffee'
ShareView = require '../../../components/share/view.coffee'
mediator = require '../../../lib/mediator.coffee'
hintTemplate = -> require('../templates/empty_hint.jade') arguments...

COLUMNS_MIN_WIDTH = 850
COLUMNS_MAX_WIDTH = 1120

module.exports.Favorites = class Favorites extends Artworks

  model: Artwork

  initialize: (models, options) ->
    { @user } = options
    @page = 0

  fetchCollections: (options) =>
    new Backbone.Collection().fetch
      url: "#{sd.API_URL}/api/v1/collections"
      data: user_id: @user.get 'id'
      success: (@collections) =>
        options?.success?()

  fetchNextPage: (options) =>
    @page++
    nextPageArtworks = new Artworks
    done = _.after @collections.length, =>
      @set nextPageArtworks.models, remove: false
      @trigger 'nextPage', nextPageArtworks
      @trigger 'end' if nextPageArtworks.length is 0
      options?.success?()
    @collections.each (collection) =>
      new Artworks().fetch
        url: "#{sd.API_URL}/api/v1/collection/#{collection.get 'id'}/artworks"
        data:
          size: 10
          sort: "-position"
          private: true
          user_id: @user.get('id')
          page: @page
        complete: done
        success: (artworks) =>
          nextPageArtworks.add artworks.models

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @favorites = new Favorites [], user: @user
    @shareView = new ShareView el: @$('.favorites-share')
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('.favorite-artworks')
      collection: @favorites
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: Math.max(
        COLUMNS_MIN_WIDTH,
        Math.min(@$('.favorite-artworks').width(), COLUMNS_MAX_WIDTH)
      )
      artworkSize: 'tall'
      allowDuplicates: true
    @favorites.on 'nextPage', @appendArtworks
    @favorites.on 'end', @endInfiniteScroll
    @$el.infiniteScroll @favorites.fetchNextPage
    @setup()

  setup: ->
    @favorites.fetchCollections success: =>
      return @showEmptyHint() if @favorites.collections.length is 0
      @favorites.fetchNextPage success: =>
        return @showEmptyHint() if @favorites.length is 0

  showEmptyHint: ->
    @$('.follows-empty-hint').html hintTemplate type: 'artworks'
    new SuggestedGenesView(
      el: @$('.suggested-genes')
      user: @user
    ).render()
    @endInfiniteScroll()

  appendArtworks: (col) =>
    @artworkColumnsView.appendArtworks col.models

  endInfiniteScroll: =>
    @$('.favorite-artworks-spinner').hide()
    $(window).off 'infiniteScroll'
