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
collectionsTemplate = -> require('../templates/collections.jade') arguments...

PAGE_SIZE = 10

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
        @collections.each (col) ->
          col.artworks = new Artworks
          col.artworks.url = "#{sd.API_URL}/api/v1/collection/#{col.get 'id'}/artworks"
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
      collection.artworks.fetch
        data:
          size: PAGE_SIZE
          sort: "-position"
          private: true
          user_id: @user.get('id')
          page: @page
        remove: false
        complete: done
        success: (a, res) => nextPageArtworks.add res

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @favorites = new Favorites [], user: @user
    @shareView = new ShareView el: @$('.favorites2-share')
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('.favorites2-artworks-list')
      collection: @favorites
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: @$('.favorites2-artworks-list').width()
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
        @renderCollections()

  showEmptyHint: ->
    @$('.favorites2-follows-empty-hint').html hintTemplate type: 'artworks'
    new SuggestedGenesView(
      el: @$('.suggested-genes')
      user: @user
    ).render()
    @endInfiniteScroll()

  appendArtworks: (col) =>
    @artworkColumnsView.appendArtworks col.models

  endInfiniteScroll: =>
    @$('.favorites2-artworks-spinner').hide()
    $(window).off 'infiniteScroll'

  renderCollections: =>
    @$('.favorites2-collections').html collectionsTemplate collections: @favorites.collections.models