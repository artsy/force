_ = require 'underscore'
sd = require('sharify').data
ContactView = require './view.coffee'
Representatives = require './collections/representatives.coffee'
headerTemplate = -> require('./templates/feedback_header.jade') arguments...
formTemplate = -> require('./templates/feedback_form.jade') arguments...

module.exports = class FeedbackView extends ContactView

  headerTemplate: (locals) ->
    headerTemplate _.extend locals,
      representative: @representatives.first()
      user: @user

  formTemplate: formTemplate

  defaults: -> _.extend super,
    placeholder: 'Leave your comments'
    url: "#{sd.API_URL}/api/v1/feedback"

  initialize: ->
    @representatives = new Representatives
    @representatives.fetch().then =>
      @renderTemplates()
      @updatePosition()
      @isLoaded()
    super

  postRender: ->
    @isLoading()
