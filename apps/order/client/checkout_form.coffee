Backbone     = require 'backbone'
analytics    = require '../../../lib/analytics.coffee'
Marketplace  = require '../../../models/marketplace.coffee'
sd           = require('sharify').data
ShippingForm = require('./shipping_form.coffee').ShippingForm

module.exports.CheckoutForm = class CheckoutForm extends ShippingForm

  balanced: false

  events:
    'click .order-form-button'         : 'onSubmit'
    'click .order-form-checkbox input' : 'toggleShippingAddress'

  toggleShippingAddress: =>
    if @$('.order-form-checkbox input').is(':checked')
      @$('.order-form-hidden').hide()
    else
      @$('.order-form-hidden').show()

  setUpFields: ->
    @fields =
      'name on card': { el: @$('input[name=card_name]'), validator: @isPresent }
      'card number': { el: @$('input[name=card_number]'), validator: @isCardNumber }
      expiration: { el: @$('.card-expiration select'), validator: @isPresent }
      'security code': { el: @$('input[name=card_security_code]'), validator: @isPresent }
      billing_street: { el: @$('input.street'), validator: @isPresent, label: 'street' }
      billing_city: { el: @$('input.city'), validator: @isPresent, label: 'city' }
      billing_state: { el: @$('input.region'), validator: @isState, label: 'state' }
      billing_zip: { el: @$('input.postal-code'), validator: @isZip }
      conditions: { el: @$('.order-form-conditions input'), validator: @isChecked, message: 'Conditions must be accepted' }
    @internationalizeFields()

  cardCallback: (response) =>
    switch response.status
      when 201  # success
        @model.submit
          creditCardUri: response.data.uri
          success: =>
            analytics.track.funnel 'Order submitted', label: analytics.modelToLabel(@model)
            @success()
          error: (xhr) => @showError xhr, "Order submission error"
        analytics.track.funnel 'Order card validated', label: analytics.modelToLabel(@model)
      when 400, 403 then @showError @errors.missingOrMalformed, "Order card missing or malformed"
      when 402 then @showError @errors.couldNotAuthorize, "Order card could not be authorized"
      when 404 then @showError @errors.other, "Order marketplace invalid"
      else @showError @errors.other, "Order card - other error"

  cardData: ->
    name: @fields['name on card'].el.val()
    card_number: @fields['card number'].el.val()
    expiration_month: @fields.expiration.el.first().val()
    expiration_year: @fields.expiration.el.last().val()
    security_code: @fields['security code'].el.val()
    street_address: @fields.billing_street.el.val()
    postal_code: @fields.billing_zip.el.val()
    country: @$("select[name='billing_address[country]']").val()

  tokenizeCard: =>
    marketplace = new Marketplace
    marketplace.fetch
      success: (marketplace) =>
        @balanced ||= require('../../../lib/vendor/balanced.js')
        @balanced.init marketplace.get('uri')
        @balanced.card.create @cardData(), @cardCallback
      error: =>
        @showError @errors.other, "Error fetching the balanced marketplace"

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analytics.track.funnel 'Order submit shipping', label: analytics.modelToLabel(@model)

    if @validateForm()
      @tokenizeCard()
    else
      @showError 'Please review the error(s) above and try again.'
    false
