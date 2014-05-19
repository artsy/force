CurrentUser = require '../../models/current_user.coffee'

return module.exports = require './save_controls/view.coffee' if process?.env?.NODE_ENV is 'test'

module.exports = ->
  if 'Set Management' in CurrentUser.orNull().get('lab_features')
    SaveControls = require './save_controls_two_btn/view.coffee'
  else
    SaveControls = require './save_controls/view.coffee'
  new SaveControls arguments...