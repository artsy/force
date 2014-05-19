_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
EditCollectionModal =  require './edit_collection_modal.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkCollection = require '../../../models/artwork_collection.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
SuggestedGenesView = require '../../suggested_genes/view.coffee'
ShareView = require '../../share/view.coffee'
mediator = require '../../../lib/mediator.coffee'
hintTemplate = -> require('../templates/empty_hint.jade') arguments...
collectionsTemplate = -> require('../templates/collections.jade') arguments...

PAGE_SIZE = 10

module.exports.ArtworkCollections = class ArtworkCollections extends Backbone.Collection

  url: ->
    "#{sd.API_URL}/api/v1/collections?user_id=" + @user.get 'id'

  initialize: (models, { @user }) ->
    @on 'add', (col) =>
      col.artworks = new Artworks
      col.artworks.url = "#{sd.API_URL}/api/v1/collection/#{col.get 'id'}/artworks"
      col.url = => "#{sd.API_URL}/api/v1/collection/#{col.get 'id'}?user_id=#{@user.get('id')}"

module.exports.Favorites = class Favorites extends Artworks

  model: Artwork

  initialize: (models, options) ->
    { @user } = options
    @page = 0
    @collections = new ArtworkCollections [], user: @user

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
    @favorites.collections.on 'add remove change:name', => _.defer @renderCollections
    @$el.infiniteScroll @favorites.fetchNextPage
    @setup()

  setup: ->
    @favorites.collections.fetch success: =>
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

  events:
    'click .favorites2-new-collection': 'openNewModal'
    'click .favorites2-edit': 'openEditModal'

  openNewModal: ->
    collection = new ArtworkCollection userId: @user.get('id'), id: null, user_id: @user.get('id')
    new EditCollectionModal width: 500, collection: collection
    collection.on 'request', => @favorites.collections.add collection

  openEditModal: (e) ->
    collection = @favorites.collections.at($(e.currentTarget).parent().index())
    new EditCollectionModal width: 500, collection: collection