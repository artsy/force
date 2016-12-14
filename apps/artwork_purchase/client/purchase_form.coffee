Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
Form = require '../../../components/mixins/form.coffee'
User = require '../../../models/user.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
{ formatMessage } = require '../helpers.coffee'

module.exports = class PurchaseForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @artwork, @user }) ->
    @inquiry = new ArtworkInquiry

  submit: ({ success, error })->
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
    @user.related().collectorProfile.findOrCreate() .then =>

    promises = [Q.promise (resolve) =>
      @inquiry.save null,
        success: =>
          analyticsHooks.trigger 'purchase:inquiry:success', { @artwork, @inquiry }
          resolve()
        error: (model, response, options) =>
          analyticsHooks.trigger 'purchase:inquiry:failiure'
          @$('.js-ap-form-errors').html @errorMessage(response)
          error?()
    ]

    if formData.attending
      @user.related()
        .collectorProfile.related()
        .userFairActions
        .attendFair @artwork.fair

      promises.push Q.allSettled(
        @user
          .related().collectorProfile
          .related().userFairActions.invoke 'save'
      )

    Q.all(promises).then success
