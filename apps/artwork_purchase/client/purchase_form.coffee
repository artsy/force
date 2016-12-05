Backbone = require 'backbone'
_ = require 'underscore'
Form = require '../../../components/mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
{ formatMessage } = require '../helpers.coffee'

module.exports = class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork, user }) ->
    @inquiry = new ArtworkInquiry

  submit: ({ success, error })->
    user = CurrentUser.orNull()
    if not user
      console.log 'Attempted to submit inquiry without user'
      return

    formData = @serializeForm()
    message = formatMessage _.extend { @artwork, user }, formData
    { name } = formData
    @inquiry.set {
      name,
      message,
      artwork: @artwork.id,
      contact_gallery: true,
      inquiry_url: window.location.href,
      user: user
    }

    @inquiry.save null,
      success: ->
        console.log 'inquiry success'
        success()
      error: (model, response, options) =>
        console.log 'inquiry error'
        @$('.js-ap-form-errors').html @errorMessage(response)
        error?()