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

  userId: ->
    @get('user_id') or @collection.user.get('id')

  saveArtwork: (artworkId, options = {}) ->
    new Backbone.Model().save {}, _.extend options,
      url: "#{API_URL}/api/v1/collection/#{@get 'id'}/artwork/#{artworkId}?user_id=#{@userId()}"

module.exports = class ArtworkCollections extends Backbone.Collection

  url: ->
    "#{API_URL}/api/v1/collections?" + qs.stringify(
      private: true
      bustCache: Math.random()
      user_id: @user.get 'id'
    )

  model: ArtworkCollection

  initialize: (models, { @user }) ->
    @on 'add', (col) =>
      col.artworks = new Artworks
      col.artworks.url = "#{API_URL}/api/v1/collection/#{col.get 'id'}/artworks"

module.exports.ArtworkCollection = ArtworkCollection