_ = require 'underscore'
{ FORCED_LOGIN_INQUIRY } = require('sharify').data
views = require '../../../components/inquiry_questionnaire/map/views.coffee'
views = _.extend {}, views,
  confirmation: require './views/confirmation.coffee'
  done: require './views/done.coffee'

determineSteps = ->
  if FORCED_LOGIN_INQUIRY is 'force_login'
    require '../../../components/inquiry_questionnaire/map/test_steps.coffee'
  else
    require '../../../components/inquiry_questionnaire/map/steps.coffee'

module.exports =
  decisions: require '../../../components/inquiry_questionnaire/map/decisions.coffee'
  steps: determineSteps()
  views: views
