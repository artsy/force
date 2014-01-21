_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
ArtworkCollection       = require '../../../models/artwork_collection.coffee'
artworkColumns  = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  initialize: (options) ->
    @setupCurrentUser()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()
    @currentUser.savedArtworks
      success: (artworks) =>
        @$('.favorite-artworks').html artworkColumns artworkColumns: artworks.groupByColumnsInOrder(3)

module.exports.init = ->
  new FavoritesView el: $('body')
