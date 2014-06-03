CurrentUser = require '../../models/current_user.coffee'
{ splitTest } = require '../../lib/analytics.coffee'
sharify = require 'sharify'
user = CurrentUser.orNull()

return module.exports = require './save_controls/view.coffee' unless user

if 'Set Management' in user.get('lab_features')
  splitTestPath = splitTest 'ab:save:controls',
    'drop down': 1 / 3
    'two button': 1 / 3
    'one button': 1 / 3
  sharify.data.SAVE_CONTROLS_SPLIT_TEST = null #splitTestPath

module.exports = switch splitTestPath
  when 'drop down' then require './save_controls_drop_down/view.coffee'
  when 'two button' then require './save_controls_two_btn/view.coffee'
  when 'one button' then require './save_controls_one_btn/view.coffee'
  else require './save_controls/view.coffee'