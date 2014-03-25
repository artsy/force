sd                 = require('sharify').data
Backbone           = require 'backbone'
analytics          = require '../../../lib/analytics.coffee'
Marketplace        = require '../../../models/marketplace.coffee'
CurrentUser        = require '../../../models/current_user.coffee'
ErrorHandlingForm  = require('../../../components/credit_card/client/error_handling_form.coffee')

{ SESSION_ID } = require('sharify').data

module.exports = class RegistrationForm extends ErrorHandlingForm

  balanced: false

  events:
    'click .registration-form-content .avant-garde-button' : 'onSubmit'

  initialize: (options) ->
    @currentUser = CurrentUser.orNull()
    @$submit = @$('.registration-form-content .avant-garde-button')
    @setUpFields()

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
    @internationalizeFields()

  cardCallback: (response) =>
    switch response.status
      when 201  # success
        data = @model.getSessionData(SESSION_ID)
        data.credit_card_uri = response.data.uri

        @currentUser.createBidder
          saleId: @model.get('id')
          success: =>
            analytics.track.funnel 'Registration submitted'
            window.location = @model.registrationSuccessUrl()
          error: (xhr) => @showError xhr, "Registration submission error"

        analytics.track.funnel 'Registration card validated'
      when 400, 403 then @showError @errors.missingOrMalformed, "Registration card missing or malformed"
      when 402 then @showError @errors.couldNotAuthorize, "Registration card could not be authorized"
      when 404 then @showError @errors.other, "Registration marketplace invalid"
      else @showError @errors.other, "Registration card - other error"

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

    analytics.track.funnel 'Registration submit billing address'

    if @validateForm()
      @tokenizeCard()
    else
      @showError 'Please review the error(s) above and try again.'
    false
