_ = require 'underscore'
views = require '../../../components/inquiry_questionnaire/map/views'
views = _.extend {}, views,
  confirmation: require './views/confirmation'
  done: require './views/done'

module.exports =
  decisions: require '../../../components/inquiry_questionnaire/map/decisions'
  steps: require '../../../components/inquiry_questionnaire/map/steps'
  views: views
