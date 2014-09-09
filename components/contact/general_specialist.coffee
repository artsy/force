_ = require 'underscore'
FeedbackView = require './feedback.coffee'
headerTemplate = -> require('./templates/inquiry_header.jade') arguments...

module.exports = class GeneralSpecialistView extends FeedbackView
  # Nearly identical to the feedback view with the inquiry header
  headerTemplate: (locals) ->
    headerTemplate _.extend locals,
      representative: @representatives.first()
      user: @user
