Backbone     = require 'backbone'
analytics    = require '../../../lib/analytics.coffee'
Marketplace  = require '../../../models/marketplace.coffee'
sd           = require('sharify').data
ShippingForm = require('./shipping_form.coffee')
{ SESSION_ID } = require('sharify').data

module.exports = class CheckoutForm extends ShippingForm

  balanced: false

  events:
    'click .order-form-button'         : 'onSubmit'
    'click .credit-card-form-checkbox input' : 'toggleShippingAddress'

  toggleShippingAddress: =>
    if @$('.credit-card-form-checkbox input').is(':checked')
      @$('.credit-card-form-hidden').hide()
    else
      @$('.credit-card-form-hidden').show()

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

  cardCallback: (response) =>
    if response.status == 201  # success
        data = @model.getSessionData(SESSION_ID)
        data.credit_card_uri = response.data.uri
        @model.save data,
          url: "#{@model.url()}/submit"
          success: =>
            analytics.track.funnel 'Order submitted', label: analytics.modelNameAndIdToLabel('artwork', @model.get('id'))
            @success()
            @$el.addClass 'order-page-complete'
            @$('.checkout-form').hide()
            @$('.success-form').show()
            $('body').removeClass 'minimal-header'
            $('html, body').scrollTop(0)
          error: (xhr) => @showError xhr, "Order submission error"
        analytics.track.funnel 'Order card validated', label: analytics.modelNameAndIdToLabel('artwork', @model.get('id'))
    else
      @showError "Your bid must be higher than #{@saleArtwork.minBid()}", response

  cardData: ->
    name: @fields['name on card'].el.val()
    card_number: @fields['card number'].el.val()
    expiration_month: @fields.month.el.first().val()
    expiration_year: @fields.year.el.last().val()
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

    analytics.track.funnel 'Order submit shipping', label: analytics.modelNameAndIdToLabel('artwork', @model.get('id'))

    if @validateForm()
      @tokenizeCard()
    else
      @showError 'Please review the error(s) above and try again.'
    false
