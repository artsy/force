_             = require 'underscore'
sd            = require('sharify').data
ContactView   = require './view.coffee'

headerTemplate  = -> require('./templates/feedback_header.jade') arguments...
formTemplate    = -> require('./templates/feedback_form.jade') arguments...

module.exports = class FeedbackView extends ContactView
  headerTemplate: headerTemplate
  formTemplate: formTemplate

  defaults: -> _.extend super,
    placeholder: 'Leave your comments'
    url: "#{sd.ARTSY_URL}/api/v1/feedback"
