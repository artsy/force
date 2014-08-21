CurrentUser = require '../../models/current_user.coffee'
user = CurrentUser.orNull()

if user
  { splitTest } = require '../../lib/analytics.coffee'
  sharify = require 'sharify'
  Cookies = require 'cookies-js'

  window.setSaveControls = (path) ->
    Cookies.set 'save-controls', path
    location.reload()

  window.clearSaveControls = ->
    Cookies.set 'save-controls', null

  if false #user.hasLabFeature('Set Management')
    splitTestPath = Cookies.get('save-controls') or splitTest 'ab:save:controls',
      'drop down': 1 / 3
      'two button': 1 / 3
      'one button': 1 / 3
    sharify.data.SAVE_CONTROLS_SPLIT_TEST = splitTestPath

  module.exports = switch splitTestPath
    when 'drop down' then require './save_controls_drop_down/view.coffee'
    when 'two button' then require './save_controls_two_btn/view.coffee'
    when 'one button' then require './save_controls_one_btn/view.coffee'
    else require './save_controls/view.coffee'

else
  module.exports = require './save_controls/view.coffee'
