_ = require 'underscore'
views = require '../../../components/inquiry_questionnaire/map/views.coffee'
views = _.extend {}, views,
  confirmation: require './views/confirmation.coffee'
  done: require './views/done.coffee'

module.exports =
  decisions: require '../../../components/inquiry_questionnaire/map/decisions.coffee'
  steps: require '../../../components/inquiry_questionnaire/map/steps.coffee'
  views: views
