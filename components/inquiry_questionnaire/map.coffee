{ FORCED_LOGIN_INQUIRY } = require('sharify').data

determineSteps = ->
  if FORCED_LOGIN_INQUIRY is 'force_login'
    require './map/test_steps.coffee'
  else
    require './map/steps.coffee'

module.exports =
  views: require './map/views.coffee'
  decisions: require './map/decisions.coffee'
  steps: determineSteps()

