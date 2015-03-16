_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
analytics = require '../../../../lib/analytics.coffee'
{ SESSION_ID, API_URL } = require('sharify').data
CurrentUser = require '../../../../models/current_user.coffee'
LoggedOutUser = require '../../../../models/logged_out_user.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'
Form = require '../../../../components/mixins/form.coffee'
AfterInquiry = require '../../../../components/after_inquiry/mixin.coffee'
defaultMessage = require '../../../../components/contact/default_message.coffee'
Introduction = require '../../../../components/introduction/model.coffee'
Mailcheck = require '../../../../components/mailcheck/index.coffee'
attendanceTemplate = -> require('./templates/attendance.jade') arguments...

class Inquiry extends Backbone.Model
  url: "#{API_URL}/api/v1/me/artwork_inquiry_request"

class Attendance extends Backbone.Model
  url: "#{API_URL}/api/v1/me/user_fair_action"

class Inquiries extends Backbone.model
  url: "#{API_URL}/api/v1/me/artwork_inquiry_requests"

module.exports = class ContactView extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, AfterInquiry

  eligibleForAfterInquiryFlow: true

  events:
    'submit #artwork-contact-form': 'submit'
    'click button': 'submit'
    'mouseover button': 'hoveredSubmit'

  initialize: ->
    @user = CurrentUser.orNull() or new LoggedOutUser
    @inquiry = new Inquiry
    @fairs = @model.relatedCollections.fairs
    @listenTo @fairs, 'sync', @renderAttendance
    @cacheSelectors()
    Mailcheck.run('#js-mailcheck-input-artwork','#js-mailcheck-hint-artwork',true)

  cacheSelectors: ->
    @$submit = @$('button')
    @$textarea = @$('textarea')

  renderAttendance: ->
    return unless @fairs.length
    @fair = @fairs.first()
    name = _s.rtrim @fair.get('name'), /\s[0-9]/
    @attendance = new Attendance name: name, action: 'Attendee', fair_id: @fair.id
    @$('#artwork-contact-form-attendance').html attendanceTemplate(attendance: @attendance)

  isAttending: ->
    @$('#artwork-contact-form-attending').prop 'checked'

  maybeWaitForAttendance: (callback) ->
    if @user.isLoggedIn() and @isAttending()
      # Can create this immediately if there is a user; otherwise we pass around the
      # attendance and use it to create an introduction at some point in the future
      @attendance.save null, success: callback, error: callback
    else if @isAttending()
      @introduction = new Introduction
      @introduction.generate @user, null, @attendance,
        success: callback, error: callback
    else
      @attendance = null
      callback()

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$submit.attr 'data-state', 'loading'

    formData = @serializeForm()
    @user.set _.pick formData, 'name', 'email'

    @maybeWaitForAttendance =>
      @inquiry.set _.extend formData,
        artwork: @model.id
        contact_gallery: true
        session_id: if @user.isLoggedIn() then undefined else SESSION_ID
        referring_url: Cookies.get('force-referrer')
        landing_url: Cookies.get('force-session-start')
        inquiry_url: window.location.href
        introduction: @introduction?.get('introduction')

      @maybeSend @inquiry,
        success: =>
          @displayInquirySent()
          new FlashMessage message: 'Thank you. Your message has been sent.'
          @$submit.attr('data-state', '').blur()
        error: (model, response, options) =>
          @reenableForm()
          @$('#artwork-contact-form-errors').html @errorMessage(response)
          @$submit.attr 'data-state', 'error'

        analytics.track.funnel 'Contact form submitted', @inquiry.attributes
        analytics.track.funnel 'Sent artwork inquiry',
          label: analytics.modelNameAndIdToLabel('artwork', @model.id)
        changed = if @inquiry.get('message') is defaultMessage(@model) then 'Did not change' else 'Changed'
        analytics.track.funnel "#{changed} default message"
        analytics.snowplowStruct 'inquiry', 'submit', @model._id, 'artwork', '0.0',
          { inquiry: { inquiry_id: @inquiry.id }, user: { email: @inquiry.email }}

  hoveredSubmit: ->
    analytics.track.hover "Hovered over contact form 'Send' button"

  displayInquirySent: ->
    $('#artwork-inquiry-sent').show()
    $('#artwork-contact-form').hide()