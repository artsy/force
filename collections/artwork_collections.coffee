_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require './artworks.coffee'
{ API_URL } = require('sharify').data

class ArtworkCollection extends Backbone.Model

  url: ->
    if @isNew()
      "#{sd.API_URL}/api/v1/collection?user_id=#{@userId()}"
    else
      "#{sd.API_URL}/api/v1/collection/#{@get 'id'}?user_id=#{@userId()}"

  userId: ->
    @get('user_id') or @collection.user.get('id')

  saveArtwork: (artworkId, options) ->
    m = new Backbone.Model
    m.url = "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artworkId}?user_id=#{@userId()}"
    m.save {}, options

module.exports = class ArtworkCollections extends Backbone.Collection

  url: ->
    "#{sd.API_URL}/api/v1/collections?user_id=" + @user.get 'id'

  model: ArtworkCollection

  initialize: (models, { @user }) ->
    @on 'add', (col) =>
      col.artworks = new Artworks
      col.artworks.url = "#{sd.API_URL}/api/v1/collection/#{col.get 'id'}/artworks"

module.exports.ArtworkCollection = ArtworkCollection