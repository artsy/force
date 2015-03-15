CurrentUser = require '../../models/current_user.coffee'
user = CurrentUser.orNull()
old = require './save_controls/view.coffee'
twoBtn = require './save_controls_two_btn/view.coffee'

if user?.hasLabFeature('Set Management')
  module.exports = twoBtn
else
  module.exports = old
