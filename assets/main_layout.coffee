CurrentUser = require '../models/current_user.coffee'

$ ->
  require('../components/main_layout/client.coffee')()
  if CurrentUser.orNull()?.hasLabFeature 'Set Management'
    require '../components/favorites2/client/analytics.coffee'