Backbone = require 'backbone'
sd = require('sharify').data
ShippingForm = require('./shipping_form.coffee')
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
{ modelNameAndIdToLabel } = require '../../../lib/analytics_helpers.coffee'
{ SESSION_ID } = require('sharify').data

module.exports = class CheckoutForm extends ShippingForm

  events:
    'click .order-form-button': 'onSubmit'
    'click .credit-card-form-checkbox input': 'toggleShippingAddress'

  toggleShippingAddress: =>
    if @$('.credit-card-form-checkbox input').is(':checked')
      @$('.credit-card-form-hidden').hide()
    else
      @$('.credit-card-form-hidden').show().find(':input').val('')

  setUpFields: ->
    @fields =
      'name on card': { el: @$('input[name=card_name]'), validator: @isPresent }
      'card number': { el: @$('input[name=card_number]'), validator: @isCardNumber }
      month: { el: @$('.card-expiration .month select'), validator: @isPresent }
      year: { el: @$('.card-expiration .year select'), validator: @isPresent }
      'security code': { el: @$('input[name=card_security_code]'), validator: @isPresent }
      billing_street: { el: @$('input.street'), validator: @isPresent, label: 'street' }
      billing_city: { el: @$('input.city'), validator: @isPresent, label: 'city' }
      billing_state: { el: @$('input.region'), validator: @isState, label: 'state' }
      billing_zip: { el: @$('input.postal-code'), validator: @isZip }
      conditions: { el: @$('.order-form-conditions input'), validator: @isChecked, message: 'Conditions must be accepted' }
    @internationalizeFields()

  cardCallback: (status, res) =>
    if status is 200
      data = @model.getSessionData(SESSION_ID)
      data.credit_card_token = res.id
      data.provider = 'stripe'
      @model.save data,
        url: "#{@model.url()}/submit"
        success: =>
          analyticsHooks.trigger 'order:submitted', label: modelNameAndIdToLabel('artwork', @model.get('id'))
          @success()
          @$el.addClass 'order-page-complete'
          @$('.checkout-form').hide()
          @$('.success-form').show()
          $('body').removeClass 'minimal-header'
          $('html, body').scrollTop(0)
        error: (m, xhr) =>
          @showError xhr.responseJSON?.message
      analyticsHooks.trigger 'order:validated', label: modelNameAndIdToLabel('artwork', @model.get('id'))
    else
      @showError res.error?.message

  cardData: ->
    name: @fields['name on card'].el.val()
    number: @fields['card number'].el.val()
    exp_month: @fields.month.el.first().val()
    exp_year: @fields.year.el.last().val()
    cvc: @fields['security code'].el.val()
    address_line1: @fields.billing_street.el.val()
    address_city: @fields.billing_city.el.val()
    address_state: @fields.billing_state.el.val()
    address_zip: @fields.billing_zip.el.val()
    address_country: @$("select[name='billing_address[country]']").val()

  tokenizeCard: =>
    Stripe.setPublishableKey(sd.STRIPE_PUBLISHABLE_KEY)
    Stripe.card.createToken @cardData(), @cardCallback

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analyticsHooks.trigger 'order:submit-shipping', label: modelNameAndIdToLabel('artwork', @model.get('id'))

    if @validateForm()
      @tokenizeCard()
    else
      @showError 'Please review the error(s) above and try again.'
    false
