CurrentUser = require '../../models/current_user.coffee'
user = CurrentUser.orNull()

if user?.hasLabFeature('Set Management')
  module.exports = require './save_controls_two_btn/view.coffee'
else
  module.exports = require './save_controls/view.coffee'
