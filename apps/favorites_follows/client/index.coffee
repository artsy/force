Backbone = require 'backbone'
Favorites = require './favorites.coffee'
{ FollowsView } = require '../../../components/favorites/client/follows.coffee'

class FavoritesFollowsRouter extends Backbone.Router
  routes:
    'favorites': 'favorites'
    'following/:kind': 'following'

  favorites: Favorites.init

  following: (kind) ->
    new FollowsView el: $('body'), pageSize: 12

module.exports.init = ->
  new FavoritesFollowsRouter
  Backbone.history.start pushState: true
