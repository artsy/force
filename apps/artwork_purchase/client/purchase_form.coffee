Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
Form = require '../../../components/mixins/form.coffee'
User = require '../../../models/user.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
{ formatMessage } = require '../helpers.coffee'
UserFairAction = require '../../../models/user_fair_action.coffee'

module.exports = class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork }) ->
    @inquiry = new ArtworkInquiry

  submit: ({ success, error })->
    formData = @serializeForm()
    message = formatMessage _.extend { @artwork }, formData
    { name } = formData
    @inquiry.set {
      name,
      message,
      artwork: @artwork.id,
      contact_gallery: true,
      inquiry_url: window.location.href,
    }

    promises = [Q.promise (resolve) =>
      @inquiry.save null,
        success: (model, response) -> resolve response
        error: (model, response, options) =>
          @$('.js-ap-form-errors').html @errorMessage(response)
          error?()
    ]

    action = new UserFairAction
    if formData.attending
      promises.push Q.promise (resolve) ->
        action.save fair_id: 'miami-project-2016',
          success: (model, response) -> resolve response
          error: -> resolve()

    Q.all(promises).spread success
