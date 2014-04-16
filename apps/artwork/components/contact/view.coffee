Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
template = -> require('./template.jade') arguments...
{ SESSION_ID } = require('sharify').data
FlashMessage = require '../../../../components/flash/index.coffee'

module.exports = class ContactView extends Backbone.View

  initialize: ->
    @user = CurrentUser.orNull()
    @render()
    @focusTextareaAfterCopy() if @user

  render: ->
    @$el.html template artwork: @model, user: @user

  events:
    'submit #artwork-contact-form': 'submit'

  submit: (e) ->
    e.preventDefault()
    @$('button').addClass 'is-loading'
    $.ajax
      url: "/api/v1/me/artwork_inquiry_request"
      type: "POST"
      data:
        artwork: @model.get('id')
        contact_gallery: true
        email: @user?.get('email') or @$('[name=email]').val()
        message: @$('textarea').val()
        name: @user?.get('name') or @$('[name=name]').val()
        session_id: if @user then undefined else SESSION_ID
      # complete: =>
      #   @$('button').removeClass 'is-loading'
      success: =>
        new FlashMessage message: 'Thank you. Your message has been sent.'
      error: (xhr) =>
        @$('#artwork-contact-form-errors').html JSON.parse(xhr.responseText).error

  focusTextareaAfterCopy: =>
    val = @$('textarea').val()
    @$('textarea').focus().val('').val(val)