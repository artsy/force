_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
Representatives = require './collections/representatives.coffee'
analytics = require('../../lib/analytics.coffee')
{ SESSION_ID, ARTSY_URL } = require('sharify').data
formTemplate = -> require('./templates/inquiry_form.jade') arguments...
headerTemplate = -> require('./templates/inquiry_header.jade') arguments...

module.exports = class InquiryView extends ContactView

  headerTemplate: (locals) ->
    headerTemplate _.extend locals,
      representative: @representatives.first()
      user: @user

  formTemplate: (locals) ->
    formTemplate _.extend locals,
      artwork: @artwork
      user: @user
      contactGallery: false

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/artwork_inquiry_request"

  initialize: (options) ->
    { @artwork } = options
    @representatives = new Representatives
    @representatives.fetch().then =>
      @renderTemplates()
      @updatePosition()
      @isLoaded()
      @focusTextarea()
    super

  postRender: ->
    @isLoading()

  submit: ->
    analytics.track.funnel 'Sent artwork inquiry',
      label: analytics.modelNameAndIdToLabel('artwork', @artwork.get('id'))
    @model.set
      artwork: @artwork.id
      contact_gallery: false
      session_id: SESSION_ID
    super

  events: -> _.extend super,
    'click.handler .modal-backdrop': undefined