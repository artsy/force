CurrentUser = require '../../models/current_user.coffee'

module.exports = ->
  if 'Set Management' in CurrentUser.orNull().get('lab_features')
    SaveControls = require './save_controls2/view.coffee'
  else
    SaveControls = require './save_controls/view.coffee'
  new SaveControls arguments...