_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require './artworks.coffee'
{ API_URL } = require('sharify').data
qs = require 'querystring'

class ArtworkCollection extends Backbone.Model

  defaults:
    private: true

  url: ->
    if @isNew()
      "#{API_URL}/api/v1/collection?user_id=#{@userId()}"
    else
      "#{API_URL}/api/v1/collection/#{@get 'id'}?user_id=#{@userId()}"

  artworkParams: ->
    qs.stringify user_id: @userId(), total_count: true, sort: '-position', size: 50

  initialize: ->
    @initArtworks()

  get: (attr) ->
    return 'My Favorite Works' if attr is 'name' and @get('id') is 'saved-artwork'
    super

  userId: ->
    @get('user_id') or @collection?.user.get('id')

  saveArtwork: (artwork, options = {}) ->
    @artworks.add artwork
    new Backbone.Model().save {}, _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  removeArtwork: (artwork, options ={}) ->
    @artworks.remove artwork
    new Backbone.Model(id: 1).destroy _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  initArtworks: ->
    @artworks ?= new Artworks [], artworkCollection: this
    @artworks.url = "#{API_URL}/api/v1/collection/#{@get 'id'}/artworks?" + @artworkParams()


module.exports = class ArtworkCollections extends Backbone.Collection

  url: ->
    "#{API_URL}/api/v1/collections?" + qs.stringify(
      private: true
      bustCache: Math.random()
      user_id: @user.get 'id'
    )

  model: ArtworkCollection

  comparator: (col) ->
    if col.get('id') is 'saved-artwork' then 0 else 1

  initialize: (models, options) ->
    { @user } = options
    @on 'add', (col) =>
      col.initArtworks()
      for event in ['destroy', 'add', 'remove']
        col.artworks.on event, (artwork) =>
          @trigger event + ':artwork', artwork, col

  fetchNextArtworksPage: (options = {}) =>
    @page ?= 0
    @page++
    artworks = []
    complete = _.after @length, =>
      artworks = _.flatten artworks
      options.success? artworks
      @trigger 'next:artworks', artworks
      @trigger 'end:artworks' if artworks.length is 0
    @each (collection) =>
      collection.artworks.fetch
        data:
          sort: "-position"
          private: true
          user_id: @user.get('id')
          page: @page
          size: 50
        remove: false
        complete: complete
        success: (a, res) =>
          artworks.push new Artworks(res, artworkCollection: collection).models
    this

  public: ->
    not true in @pluck('private')

  togglePrivacy: ->
    if @public()
      @each (col) -> col.save private: true
    else
      @each (col) -> col.save private: false

module.exports.ArtworkCollection = ArtworkCollection