Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Artworks = require '../collections/artworks.coffee'

# This collection checks if groups of artworks are embeddable
# It binds to the existing events from the artwork collection
module.exports = class EmbeddableCollection extends Backbone.Model

  urlRoot: -> "#{sd.API_URL}/api/v1/artworks/embeddable"

  initialize: (options) ->
    throw new Error("artworkCollection required") unless options.artworkCollection
    options.artworkCollection.on 'processingRequest', @checkArtworksEmbeddable

  checkArtworksEmbeddable: (params) =>
    artworks = new Artworks
    artworks.url = "#{@url()}?#{params}"
    artworks.fetch
      error: (response) =>
        options?.error?(response)
      success: (response) =>
        _.each response.models, (embeddableArtworkJSON) =>
          # We're adding these wholesale, so we need to trigger 'add' for individual listeners
          _.defer => @trigger "embeddable:#{embeddableArtworkJSON.id}"
        @trigger 'embeddableChecked'
