_ = require 'underscore'
sd = require('sharify').data
ContactView = require './view.coffee'
headerTemplate = -> require('./templates/feedback_header.jade') arguments...
formTemplate = -> require('./templates/feedback_form.jade') arguments...

module.exports = class FeedbackView extends ContactView
  headerTemplate: ->
    headerTemplate arguments...

  formTemplate: ->
    formTemplate arguments...

  defaults: -> _.extend super,
    placeholder: 'Leave your comments'
    url: "#{sd.API_URL}/api/v1/feedback"
