_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
moment = require 'moment'
{ SESSION_ID, API_URL } = require('sharify').data
CurrentUser = require '../../../../models/current_user.coffee'
LoggedOutUser = require '../../../../models/logged_out_user.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'
Form = require '../../../../components/mixins/form.coffee'
AfterInquiry = require '../../../../components/after_inquiry/mixin.coffee'
defaultMessage = require '../../../../components/contact/default_message.coffee'
Introduction = require '../../../../components/introduction/model.coffee'
Mailcheck = require '../../../../components/mailcheck/index.coffee'
ConfirmInquiryView = require '../../../../components/contact/confirm_inquiry.coffee'
analytics = require '../../../../lib/analytics.coffee'
attendanceTemplate = -> require('./templates/attendance.jade') arguments...
inquirySentTemplate = -> require('./templates/inquiry_sent.jade') arguments...

class Inquiries extends Backbone.Collection
  url: "#{API_URL}/api/v1/me/artwork_inquiry_requests"

class Inquiry extends Backbone.Model
  url: "#{API_URL}/api/v1/me/artwork_inquiry_request"

class Attendance extends Backbone.Model
  url: "#{API_URL}/api/v1/me/user_fair_action"

module.exports = class ContactView extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, AfterInquiry

  eligibleForAfterInquiryFlow: true

  events:
    'submit #artwork-contact-form': 'submit'
    'click button': 'submit'
    'mouseover button': 'hoveredSubmit'
    'click .artwork-inquiry-send-new': 'showInquiryForm'

  initialize: ->
    @user = CurrentUser.orNull() or new LoggedOutUser
    @inquiry = new Inquiry
    @fairs = @model.relatedCollections.fairs
    @listenTo @fairs, 'sync', @renderAttendance
    @cacheSelectors()
    Mailcheck.run('#js-mailcheck-input-artwork','#js-mailcheck-hint-artwork',true)
    @checkInquiredArtwork()

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
    analytics.track.funnel 'Clicked "Contact Gallery" button', @model.attributes
    analytics.snowplowStruct 'contact_gallery', 'click', @model.get('id'), 'artwork'

    new ConfirmInquiryView
      artwork: @model
      partner: @model.get 'partner'
      inputEmail: $('#js-mailcheck-input-artwork').val()
      inputName: $('#artwork-contact-form input:first').val()
      inputMessage: $('#artwork-contact-form textarea').val()
      success: =>
        console.log 'in the success method'
        @displayInquirySent()
        new FlashMessage message: 'Thank you. Your message has been sent.'
        @$submit.attr('data-state', '').blur()
      error: (model, response, options) =>
        @reenableForm()
        @$('#artwork-contact-form-errors').html @errorMessage(response)
        @$submit.attr 'data-state', 'error'
      exit: =>
        @reenableForm()

  hoveredSubmit: ->
    analytics.track.hover "Hovered over contact form 'Send' button"

  displayInquirySent: ->
    $('#artwork-inquiry-sent-immediate').show()
    $('#artwork-contact-form').hide()

  checkInquiredArtwork: ->
    @inquiries = new Inquiries
    @inquiries.fetch
      success: (inquiries) =>
        inquiry = @inquiries.findWhere { inquiry_url: location.href }
        if inquiry
          sent_time = moment(inquiry.get('created_at')).format("MMM D, YYYY")
          @$('#artwork-contact-form').hide()
          @$('#artwork-inquiry-sent')
            .html(inquirySentTemplate(sent_time: sent_time))
            .show()

  showInquiryForm: ->
    $('#artwork-inquiry-sent').hide()
    $('#artwork-contact-form').show()