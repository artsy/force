Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
Form = require '../../../components/mixins/form'
CurrentUser = require '../../../models/current_user'
ArtworkInquiry = require '../../../models/artwork_inquiry'
{ formatMessage } = require '../helpers'
UserFairAction = require '../../../models/user_fair_action'

module.exports = class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork }) ->
    @inquiry = new ArtworkInquiry

  submit: ({ user, success, error })->
    formData = @serializeForm()
    message = formatMessage _.extend { @artwork, user }, formData
    @inquiry.set {
      message,
      artwork: @artwork.id,
      contact_gallery: true,
      inquiry_url: window.location.href,
      purchase_request: true,
    }

    promises = [@inquiry.save null,
      success: (model, response) =>
        analyticsHooks.trigger 'purchase:inquiry:success', { @artwork, @inquiry, user }
      error: (model, response, options) =>
        errorMessage = @errorMessage(response)
        analyticsHooks.trigger 'purchase:inquiry:failure', {
          @artwork,
          @inquiry,
          user,
          message: errorMessage
        }
        @$('.js-ap-form-errors').html errorMessage
        error?()
    ]

    action = new UserFairAction
    if formData.attending
      promises.push Q.promise (resolve) ->
        action.save fair_id: 'miami-project-2016',
          success: resolve
          error: resolve

    Q.all(promises)
      .then success
      .catch -> # handled by error callback
