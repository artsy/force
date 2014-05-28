_             = require 'underscore'
Backbone      = require 'backbone'
Cookies       = require 'cookies-js'
analytics     = require '../../../../lib/analytics.coffee'
CurrentUser   = require '../../../../models/current_user.coffee'
FlashMessage  = require '../../../../components/flash/index.coffee'
Form          = require '../../../../components/mixins/form.coffee'
AfterInquiry  = require '../../../../components/after_inquiry/mixin.coffee'

{ SESSION_ID, API_URL }  = require('sharify').data

template = -> require('./template.jade') arguments...

module.exports = class ContactView extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, AfterInquiry

  eligibleForAfterInquiryFlow: true

  events:
    'submit #artwork-contact-form' : 'submit'
    'mouseover button'             : 'hoveredSubmit'

  initialize: ->
    @user = CurrentUser.orNull()

    @inquiry      = new Backbone.Model
    @inquiry.url  = "#{API_URL}/api/v1/me/artwork_inquiry_request"

    @render()

  render: ->
    @$el.html template artwork: @model, user: @user

    @$submit    = @$('button')
    @$textarea  = @$('textarea')

    @focusTextarea() if @user

  focusTextarea: =>
    val = @$textarea.val()
    @$textarea.focus().val('').val val

  submit: (e) ->
    e.preventDefault()

    @$submit.attr 'data-state', 'loading'

    @inquiry.set _.extend @serializeForm(),
      artwork         : @model.id
      contact_gallery : true
      session_id      : if @user then undefined else SESSION_ID
      referring_url   : Cookies.get('force-referrer')
      landing_url     : Cookies.get('force-session-start')
      inquiry_url     : window.location.href

    @inquiry.save null,
      success: =>
        new FlashMessage message: 'Thank you. Your message has been sent.'
        @$submit.attr('data-state', '').blur()
      error: (model, response, options) =>
        @$('#artwork-contact-form-errors').html @errorMessage(response)
        @$submit.attr 'data-state', 'error'

    analytics.track.funnel 'Contact form submitted', @inquiry.attributes
    analytics.track.funnel 'Sent artwork inquiry',
      label: analytics.modelNameAndIdToLabel('artwork', @model.id)

  hoveredSubmit: ->
    analytics.track.hover "Hovered over contact form 'Send' button"
