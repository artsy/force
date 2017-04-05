_ = require 'underscore'
Backbone = require 'backbone'
Inquiry = require '../../../../../models/inquiry'
formTemplate = -> require('../templates/inquiry_form.jade') arguments...
confirmationTemplate = -> require('../templates/inquiry_confirmation.jade') arguments...
analytics = require '../../../../../lib/analytics'
analyticsHooks = require '../../../../../lib/analytics_hooks'
Cookies = require 'cookies-js'

module.exports = class SubmitInquiryView extends Backbone.View

  initialize: (options) ->
    { @user, @sessionID } = options
    @inquiry = new Inquiry
      artwork: @model.get 'id'
      session_id: @sessionID
      name: @user?.get('name')
      email: @user?.get('email')
    @listenTo @inquiry, 'request', =>
      analyticsHooks.trigger 'track', 'Sent artwork inquiry', { label: "Artwork:#{@model.get 'id'}" }

  events:
    'submit form': 'submitInquiry'

  serializeForm: ->
    _.reduce(@$('form').serializeArray(), (memo, input) ->
      memo[input.name] = input.value if input.value
      memo
    , {})

  submitInquiry: (e) ->
    e.preventDefault()

    @$('.avant-garde-box-button').addClass('avant-garde-box-button-loading')
    # Currently odd bug with Backbone validation that deserves investigation
    # https://github.com/jashkenas/backbone/issues/2955
    @inquiry.set _.extend @serializeForm(),
      referring_url: Cookies.get 'inquiry-referrer'
      landing_url: Cookies.get 'inquiry-session-start'
      inquiry_url: location.href
    return @renderErrors {}, msg if msg = @inquiry.validate @inquiry.toJSON()

    @inquiry.save null,
      validate: false
      success: =>
        @$el.html confirmationTemplate
          header: 'Thank You'
          message: 'Your message has been sent.'
          artwork: @model.toJSON()
          defaultMessage: @model.get('partner').contact_message

      error: (model, xhr, options = {}) =>
        message = try
          obj = JSON.parse(xhr.responseText)
          obj.error or obj.message
        catch
          """
            If you'd like to provide more details around your inquiry,
            please email <a href='mailto:inquiries@artsy.net'>inquiries@artsy.net</a>.
          """
        @$el.html confirmationTemplate
          artwork: @model.toJSON()
          header: 'Sorry, there was an error'
          message: message

  renderErrors: (m, err) ->
    @$('.submit-inquiry-errors').html err
    @$('.avant-garde-box-button').removeClass('avant-garde-box-button-loading')
