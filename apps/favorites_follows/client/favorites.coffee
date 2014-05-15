
CurrentUser = require '../../../models/current_user.coffee'

module.exports.init = ->
  if 'Set Management' in CurrentUser.orNull().get('lab_features')
    { FavoritesView } = require '../../../components/favorites2/client/favorites.coffee'
  else
    { FavoritesView } = require '../../../components/favorites/client/favorites.coffee'
  new FavoritesView el: $('#favorites')