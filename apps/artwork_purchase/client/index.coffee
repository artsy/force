Backbone = require 'backbone'
_ = require 'underscore'
{ ARTWORK } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
formatMessage = require './format_message.coffee'

class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork, @user }) ->
    console.log @artwork, @user
    @inquiry = new ArtworkInquiry

  events:
    'submit .js-ap-form'          : 'onSubmit'
    'click .js-ap-summary-submit' : 'onSubmit'

  onSubmit: (e) ->
    e.preventDefault()
    $(e.target).blur()
    return unless @validateForm()
    return if @formIsSubmitting()

    @$('button').attr 'data-state', 'loading'
    formData = @serializeForm()
    message = formatMessage _.extend { @artwork, @user }, formData
    { name } = formData
    @inquiry.set {
      name,
      message,
      artwork: @artwork.id
      contact_gallery: true
    }
    console.log @inquiry, message
    debugger

class ThankYouView extends Backbone.View

module.exports.init = ->
  user = CurrentUser.orNull()
  artwork = ARTWORK
  new PurchaseForm { user, artwork, el: $('#purchase-page') }
  new ThankYouView { user, artwork, el: $('#purchase-page') }