Backbone     = require 'backbone'
analytics    = require '../../../lib/analytics.coffee'
Marketplace  = require '../../../models/marketplace.coffee'
sd           = require('sharify').data
isCreditCard = require('validator').isCreditCard
ShippingForm = require('./shipping_form.coffee').ShippingForm

module.exports.CheckoutForm = class CheckoutForm extends ShippingForm

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
      'name on card': { el: @$el.find('input[name=card_name]'), validator: @isPresent }
      'card number': { el: @$el.find('input[name=card_number]'), validator: @isCardNumber }
      expiration: { el: @$el.find('.card_expiration select'), validator: @isPresent }
      'security code': { el: @$el.find('input[name=card_security_code]'), validator: @isPresent }
      billing_street: { el: @$el.find('input.street'), validator: @isPresent, label: 'street' }
      billing_city: { el: @$el.find('input.city'), validator: @isPresent, label: 'city' }
      billing_state: { el: @$el.find('input.region'), validator: @isState, label: 'state' }
      billing_zip: { el: @$el.find('input.postal_code'), validator: @isZip, label: 'zip' }

  isCardNumber: ($el) => isCreditCard $el.val()

  cardData: ->
    name: @fields['name on card'].el.val()
    card_number: @fields['card number'].el.val()
    expiration_month: @fields.expiration.el.first().val()
    expiration_year: @fields.expiration.el.last().val()
    security_code: @fields['security code'].el.val()
    street_address: @fields.billing_street.el.val()
    postal_code: @fields.billing_zip.el.val()
    country: @$el.find("select[name='billing_address[country]']").val()

  tokenizeCard: =>
    marketplace = new Marketplace
    marketplace.fetch
      success: (marketplace) =>
        balanced.init marketplace.get('uri')
        balanced.card.create @cardData(), @cardCallback
        @success()
      error: =>
        @showError @errors.other, "Error fetching the balanced marketplace"

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analytics.track.funnel 'Order submit shipping', @model

    if @validateForm()
      @model.save @orderAttrs(),
        success: @tokenizeCard
        error: (model, xhr, options) => @showError xhr, 'Order update error'
    else
      @showError 'Please review the error(s) above and try again.'
    false
