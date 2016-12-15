_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'
Partner = require '../../models/partner.coffee'
Cookies = require 'cookies-js'
Form = require '../mixins/form.coffee'
defaultMessage = require './default_message.coffee'

{ SESSION_ID, API_URL } = require('sharify').data

formTemplate = -> require('./templates/inquiry_form_confirm.jade') arguments...
headerTemplate = -> require('./templates/inquiry_partner_header.jade') arguments...

module.exports = class ConfirmInquiryView extends ContactView
  _.extend @prototype, Form

  events: -> _.extend super,
    'click.handler .modal-backdrop': undefined
    'click .contact-form-cancel': 'close'

  headerTemplate: (locals) =>
    headerTemplate _.extend locals,
      artwork: @artwork
      partner: @partner
      user: @user

  formTemplate: (locals) =>
    unless @inputEmail and @inputName then showInputs = true
    formTemplate _.extend locals,
      artwork: @artwork
      user: @user
      defaultMessage: @inputMessage
      inputEmail: @inputEmail
      inputName: @inputName
      showInputs: showInputs

  defaults: -> _.extend super,
    url: "#{API_URL}/api/v1/me/artwork_inquiry_request"
    successMessage: 'Thank you. Your inquiry has been sent.'

  initialize: (options) ->
    @success = options.success
    @error = options.error
    @exit = options.exit
    @artwork = options.artwork
    @inputName = options.inputName
    @inputEmail = options.inputEmail
    @partner = new Partner options.partner
    @inputMessage = options.inputMessage ?= defaultMessage(@artwork, @partner)
    @partner.related().locations.fetch complete: =>
      @renderTemplates()
      @renderLocation()
      @updatePosition()
      @isLoaded()
      @focusTextareaAfterCopy()
      @hideCloseButton()
    super

  renderLocation: =>
    return if @partner.related().locations.length > 1
    return unless city = @partner.displayLocations @user?.get('location')?.city
    @$('.contact-location').html ", " + city

  onSubmit: (e) -> @submit(e)

  submit: (e) =>
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'
    formData = @serializeForm()

    @model.set _.extend formData,
      artwork: @artwork.id
      contact_gallery: true
      session_id: SESSION_ID
      referring_url: Cookies.get('force-referrer')
      landing_url: Cookies.get('force-session-start')
      inquiry_url: window.location.href
      user: @user

    @model.save null,
      success: =>
        @inquirySentAnalytics()
        @close()
        @success?()
      error: (model, response, options) =>
        @reenableForm()
        @$('#contact-errors').html @errorMessage(response)
        @error?()

  inquirySentAnalytics: =>
    analyticsHooks.trigger 'inquiry:sent',
      label: modelNameAndIdToLabel('artwork', @artwork.get('id'))
      changed: if @model.get('message').trim() is @inputMessage.trim() then 'Did not change' else 'Changed'
      session_id: SESSION_ID
      attributes: @artwork.attributes
      version: 'Updated'

  postRender: =>
    @isLoading()

  close: =>
    @exit?()
    super

  hideCloseButton: ->
    $('.modal-close').hide()
