_             = require 'underscore'
sd            = require('sharify').data
ContactView   = require './view.coffee'

headerTemplate  = -> require('./templates/feedback_header.jade') arguments...

module.exports = class FeedbackView extends ContactView
  headerTemplate: headerTemplate

  defaults: -> _.extend super,
    placeholder: 'Leave your comments'
    url: "#{sd.ARTSY_URL}/api/v1/feedback"
