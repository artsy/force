{ FavoritesView } = require '../../../components/favorites/client/favorites.coffee'

module.exports.init = ->
  new FavoritesView el: $('#favorites')