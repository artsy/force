Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
template = -> require('./template.jade') arguments...
{ SESSION_ID } = require('sharify').data
FlashMessage = require '../../../../components/flash/index.coffee'
analytics = require '../../../../lib/analytics.coffee'

module.exports = class ContactView extends Backbone.View

  initialize: ->
    @user = CurrentUser.orNull()
    @render()

  render: ->
    @$el.html template artwork: @model, user: @user
    @focusTextarea() if @user

  focusTextarea: =>
    val = @$('textarea').val()
    @$('textarea').focus().val('').val(val)

  events:
    'submit #artwork-contact-form': 'submit'
    'mouseover button': 'hoveredSubmit'

  submit: (e) ->
    e.preventDefault()
    @$('button').addClass 'is-loading'
    data =
      artwork: @model.get('id')
      contact_gallery: true
      email: @user?.get('email') or @$('[name=email]').val()
      message: @$('textarea').val()
      name: @user?.get('name') or @$('[name=name]').val()
      session_id: if @user then undefined else SESSION_ID
    analytics.track.funnel 'Contact form submitted', data
    $.ajax
      url: "/api/v1/me/artwork_inquiry_request"
      type: "POST"
      data: data
      complete: =>
        @$('button').removeClass 'is-loading'
      success: =>
        new FlashMessage message: 'Thank you. Your message has been sent.'
      error: (xhr) =>
        res = JSON.parse(xhr.responseText)
        @$('#artwork-contact-form-errors').html res.error or res.message or res.toString()

  hoveredSubmit: ->
    analytics.track.hover "Hovered over contact form 'Send' button"