Backbone = require 'backbone'
_ = require 'underscore'
{ ARTWORK } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
{ formatMessage } = require '../helpers.coffee'
successTemplate = ->require('../templates/success.jade') arguments...

class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork, @user }) ->
    @inquiry = new ArtworkInquiry

  events:
    'submit .js-ap-form'          : 'onSubmit'
    'click .js-ap-summary-submit' : 'onSubmit'

  onSubmit: (e) ->
    e.preventDefault()
    return unless @validateForm()
    return if @formIsSubmitting()

    @$('button').attr 'data-state', 'loading'
    formData = @serializeForm()
    message = formatMessage _.extend { @artwork, @user }, formData
    { name } = formData
    @inquiry.set {
      name,
      message,
      artwork: @artwork.id,
      contact_gallery: true,
      inquiry_url: window.location.href,
      user: @user
    }

    @inquiry.save null,
      success: =>
        @showSuccess()
      error: (model, response, options) =>
        @reenableForm()
        @$('.js-ap-form-errors').html @errorMessage(response)

  showSuccess: ->
    Backbone.history.navigate @artwork.href + '/thank-you', replace: true
    $('.body-artwork-purchase').removeClass 'minimal-header'
    @$el.html successTemplate { @artwork }
    $('html,body').scrollTop(0);

class ThankYouView extends Backbone.View

module.exports.init = ->
  user = CurrentUser.orNull()
  artwork = ARTWORK
  Backbone.history.start pushState: true
  new PurchaseForm { user, artwork, el: $('#purchase-page') }
  new ThankYouView { user, artwork, el: $('#purchase-page') }