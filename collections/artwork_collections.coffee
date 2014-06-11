_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require './artworks.coffee'
{ API_URL } = require('sharify').data
qs = require 'querystring'

class ArtworkCollection extends Backbone.Model

  defaults:
    private: false

  url: ->
    if @isNew()
      "#{API_URL}/api/v1/collection?user_id=#{@userId()}"
    else
      "#{API_URL}/api/v1/collection/#{@get 'id'}?user_id=#{@userId()}"

  initialize: ->
    @set name: 'My Favorite Works' if @get('id') is 'saved-artwork'
    @initArtworks()

  userId: ->
    @get('user_id') or @collection.user.get('id')

  saveArtwork: (artwork, options = {}) ->
    @artworks.add artwork
    new Backbone.Model().save {}, _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  removeArtwork: (artwork, options ={}) ->
    @artworks.remove artwork
    new Backbone.Model(id: 1).destroy _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artwork.get 'id'}?user_id=#{@userId()}"

  initArtworks: ->
    @artworks ?= new Artworks
    @artworks.url = "#{API_URL}/api/v1/collection/#{@get 'id'}/artworks?user_id=#{@userId()}"

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

  initialize: (models, { @user }) ->
    @on 'add', (col) => col.initArtworks()

  fetchNextArtworksPage: =>
    @page ?= 0
    @page++
    artworks = []
    complete = _.after @length, =>
      artworks = _.flatten artworks
      @trigger 'next:artworks', artworks
      @trigger 'end:artworks' if artworks.length is 0
    @each (collection) =>
      collection.artworks.fetch
        data:
          sort: "-position"
          private: true
          user_id: @user.get('id')
          page: @page
        remove: false
        complete: complete
        success: (a, res) =>
          artwork.collectionId = collection.get('id') for artwork in res
          artworks.push new Artworks(res).models
    this

module.exports.ArtworkCollection = ArtworkCollection