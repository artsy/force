CurrentUser = require '../../models/current_user.coffee'

user = CurrentUser.orNull()

return module.exports = require './save_controls/view.coffee' unless user

module.exports = ->
  if 'Set Management' in user.get('lab_features')
    SaveControls = require './save_controls_two_btn/view.coffee'
  else
    SaveControls = require './save_controls/view.coffee'
  new SaveControls arguments...