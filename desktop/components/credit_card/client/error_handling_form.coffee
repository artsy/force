_ = require 'underscore'
Backbone = require 'backbone'
isCreditCard = require('validator').isCreditCard
xssFilters = require 'xss-filters'
isEmail = require('validator').isEmail

analyticsHooks = require '../../../lib/analytics_hooks'

module.exports = class ErrorHandlingForm extends Backbone.View

  fields: {}
  errors:
    missingOrMalformed: "Your card appears to be missing or malformed. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."
    couldNotAuthorize: "Your card could not be authorized. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."
    paymentError: "Your payment could not be processed. Please try again or contact <a href='mailto:support@artsy.net'>support</a>."
    badZip: "The ZIP code provided did not match your card number. Please check it again, try another card, or contact <a href='mailto:support@artsy.net'>support</a>."
    badSecurityCode: "The security code provided did not match your card number. Please check it again, try another card, or contact <a href='mailto:support@artsy.net'>support</a>."
    other: "There was a problem processing your order. Please try another card or contact <a href='mailto:support@artsy.net'>support</a>."
    timeout: "Processing your payment took too long. Please try again or contact <a href='mailto:support@artsy.net'>support</a>."
    connection: "Please check your network connectivity and try again."

  isChecked: ($el) => $el.is(':checked')
  isCardNumber: ($el) => isCreditCard $el.val()
  isEmail: ($el) -> isEmail $el.val()
  isPresent: ($el) -> $el.val()? && $.trim($el.val()).length > 0
  isState: ($el) => @isPresent($el) || $el.parent().parent().find('select.country').val() != 'USA'
  isZip: ($el) => @isPresent($el)

  clearErrors: ->
    @$el.find('.has-error').removeClass('has-error')
    @$el.find('.error').remove()

  validateForm: ->
    errors = {}
    @filterHtml()
    @clearErrors()
    for own key, val of @fields
      continue unless val.el.is(':visible') && !val.validator(val.el)
      errors[key] = val.message || "Invalid #{val.label || key}"
      val.el.addClass 'has-error'
      val.el.last().after "<div class='error'>#{errors[key]}</div>"
    _.isEmpty(errors)

  filterHtml: ->
    for own key, field of @fields
      field.el.val xssFilters.inHTMLData(field.el.val())

  showError: (description, response={}) =>
    if response.responseText? and (errorJson = try JSON.parse response.responseText)
      switch errorJson.type
        when 'payment_error'
          message = @errors.paymentError
        when 'param_error'
          message = @errors[errorJson.message] || errorJson.message
        else
          message = @errors.other
      # Differently formatted errors from gravity,
      # we either want to override or fallback to the message sent from gravity
      if errorJson.error?
        message = @errors[errorJson.error] || errorJson.error
    else if response.statusText == 'timeout'
      message = @errors.timeout
    else if response.status == 400 or response.status == 403
      message = @errors.missingOrMalformed
      description = "Registration card missing or malformed."
    else if response.status == 402
      message = @errors.couldNotAuthorize
      description = "Registration card could not be authorized."
    else if response.status == 404
      message = "Registration marketplace invalid."
      description = message
    else if response.status == 0
      message = @errors.connection
      description = message
    else if typeof(description) == 'string'
      message = description
    else
      message = @errors.other

    # Display stripe errors
    message += " #{response.error.additional}" if response?.error?.additional

    @$submit.removeClass('is-loading').before "<div class='error'>#{message}</div>"
    analyticsHooks.trigger 'error', description

  internationalizeFields: ->
    @$('select.country').change =>
      if @$('select.country').val() == 'USA'
        @$el.removeClass('not-usa')
        @$('.postal-code label').text 'Zip Code'
        @$('.region label').text 'City'
      else
        @$el.addClass('not-usa')
        @$('.postal-code label').text 'Postal Code'
        @$('.region label').text 'Region'
