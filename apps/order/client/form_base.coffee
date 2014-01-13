_         = require 'underscore'
Backbone  = require 'backbone'
analytics = require('../../../lib/analytics.coffee')

module.exports.ErrorHandlingForm = class ErrorHandlingForm extends Backbone.View

  fields: {}
  errors:
    missingOrMalformed: "Your card appears to be missing or malformed. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."
    couldNotAuthorize: "Your card could not be authorized. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."
    paymentError: "Your payment could not be processed. Please try again or contact <a href='mailto:support@artsy.net'>support</a>."
    other: "There was a problem processing your order. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."

  clearErrors: ->
    @$el.find('.has_error').removeClass('has_error')
    @$el.find('.error').remove()

  validateForm: ->
    errors = {}
    @clearErrors()
    for own key, val of @fields
      continue unless val.el.is(':visible') && !val.validator(val.el)
      errors[key] = val.message || "Invalid #{val.label || key}"
      val.el.addClass 'has_error'
      val.el.last().after "<div class='error'>#{errors[key]}</div>"
    _.isEmpty(errors)

  showError: (response, description) =>
    if (typeof response) == 'string'
      message = response
    else if response.responseText?
      errorJson = JSON.parse response.responseText
      message = if errorJson.type == 'payment_error' then @errors.paymentError else @errors.other
    else
      message = @errors.other
    @$submit.removeClass('is-loading').before "<div class='error'>#{message}</div>"
    analytics.error(description) if description?
