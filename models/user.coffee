sd                = require('sharify').data
Backbone          = require 'backbone'
ArtworkCollection = require './artwork_collection.coffee'

module.exports = class User extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/user"

  # Should only be run after the user has been fetched and has an id
  initializeDefaultArtworkCollection: (options) ->
    unless @get('artworkCollections')?.length > 0
      @set artworkCollections: [new ArtworkCollection(userId: @get('id'))]
    @defaultArtworkCollection().fetch(options) unless @defaultArtworkCollection.fetched

  defaultArtworkCollection: -> @get('artworkCollections')[0]
