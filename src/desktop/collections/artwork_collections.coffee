_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require './artworks.coffee'
qs = require 'querystring'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

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
    @artworks.add artwork, at: 0
    new Backbone.Model().save {}, _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  removeArtwork: (artwork, options ={}) ->
    @artworks.remove artwork
    new Backbone.Model(id: 1).destroy _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  initArtworks: ->
    @artworks ?= new Artworks [], artworkCollection: this
    @artworks.url = "#{API_URL}/api/v1/collection/#{@get 'id'}/artworks?" + @artworkParams()
    for event in ['destroy', 'add', 'remove']
      @artworks.on event, ((event) =>
        (artwork) => @collection?.trigger event + ':artwork', artwork, this
      )(event)

module.exports = class ArtworkCollections extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  url: ->
    "#{API_URL}/api/v1/collections?" + qs.stringify(
      private: true
      user_id: @user.get 'id'
      bustCache: Math.random()
    )

  model: ArtworkCollection

  comparator: (col) ->
    if col.get('id') is 'saved-artwork' then 0 else 1

  initialize: (models, options) ->
    { @user } = options
    @on 'add', (col) => col.initArtworks()

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

  removeArtwork: (artworkId) ->
    @each (col) -> col.removeArtwork(artwork) if artwork = col.artworks.get artworkId

  # Injects an artwork into each collection it belongs to by fetching
  # /api/v1/collections?artwork_id=
  injectArtwork: (artwork, options) ->
    new Backbone.Collection().fetch
      url: @url() + '&artwork_id=' + artwork.id
      error: options.error
      success: (cols) =>
        cols.each (c) => @get(c.id)?.artworks.add(artwork)
        options?.success?()

module.exports.ArtworkCollection = ArtworkCollection
