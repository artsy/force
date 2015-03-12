_ = require 'underscore'
FeedbackView = require './feedback.coffee'
Representatives = require './collections/representatives.coffee'
headerTemplate = -> require('./templates/inquiry_header.jade') arguments...

module.exports = class GeneralSpecialistView extends FeedbackView
  headerTemplate: (locals) ->
    headerTemplate _.extend locals,
      representative: @representatives.first()
      user: @user

  initialize: ->
    @representatives = new Representatives
    @representatives.fetch().then =>
      @renderTemplates()
      @updatePosition()
      @isLoaded()
    super

  postRender: ->
    @isLoading()
