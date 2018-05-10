$ = require('jquery')
CurrentUser = require '../models/current_user.coffee'

$ ->
  require('../components/main_layout/client.coffee')()
  require('../apps/auth2/client').initModalManager()
