_ = require 'underscore'
Cookies = require '../cookies/index'
ContactView = require './view.coffee'
formTemplate = -> require('./templates/inquiry_form.jade') arguments...
{ SESSION_ID, API_URL } = sd = require('sharify').data
{ analyticsHooks } = require "../inquiry_questionnaire/analytics/analyticsHooks"


module.exports = class InquiryView extends ContactView
  # Prevents clicks on the backdrop from closing
  # the contact form
  events: -> _.extend super,
    'click.handler .modal-backdrop': undefined

  headerTemplate: (locals) ->
    """
      <h1 class='modal-h1'>Ask a Specialist</h1>
      <hr>
    """

  formTemplate: (locals) ->
    formTemplate _.extend locals,
      artwork: @artwork
      user: @user
      contactGallery: false

  defaults: -> _.extend super,
    url: "#{API_URL}/api/v1/me/artwork_inquiry_request"
    successMessage: 'Thank you. Your Message Has Been Sent.'

  initialize: (options) ->
    { @artwork } = options
    super

  ready: =>
    @renderTemplates()
    @updatePosition()
    @isLoaded()
    @focusTextareaAfterCopy()

  postRender: ->
    @isLoading()

  onSubmit: ->
    super

    analyticsHooks.trigger 'inquiry:sync', artwork: @artwork, inquiry: @model

    contactGallery = if @partner.get('directly_contactable') and \
      @sales.findWhere(is_auction: true)? then yes else no

    @model.set
      artwork: @artwork.id
      contact_gallery: contactGallery
      session_id: SESSION_ID
      referring_url: Cookies.get('force-referrer')
      landing_url: Cookies.get('force-session-start')
      inquiry_url: window.location.href

    @submit()

