sd = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../../lib/analytics.coffee'
Marketplace = require '../../../models/marketplace.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ErrorHandlingForm = require('../../../components/credit_card/client/error_handling_form.coffee')
ModalPageView = require '../../../components/modal/page.coffee'

{ SESSION_ID } = require('sharify').data

module.exports = class RegistrationForm extends ErrorHandlingForm

  events:
    'click .registration-form-content .avant-garde-button-black': 'onSubmit'
    'click .bidding-question': 'showBiddingDialog'

  initialize: (options) ->
    @success = options.success
    @currentUser = CurrentUser.orNull()
    @$submit = @$('.registration-form-content .avant-garde-button-black')
    @setUpFields()

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width: '700px'
      pageId: 'auction-info'

  setUpFields: ->
    @fields =
      'name on card': { el: @$('input[name=card_name]'), validator: @isPresent }
      'card number': { el: @$('input[name=card_number]'), validator: @isCardNumber }
      'security code': { el: @$('input[name=card_security_code]'), validator: @isPresent }
      telephone: { el: @$('input.telephone'), validator: @isPresent }
      month: { el: @$('.card-expiration .month select'), validator: @isPresent }
      year: { el: @$('.card-expiration .year select'), validator: @isPresent }
      street: { el: @$('input.street'), validator: @isPresent, label: 'address' }
      city: { el: @$('input.city'), validator: @isPresent, label: 'city' }
      state: { el: @$('input.region'), validator: @isState, label: 'state' }
      zip: { el: @$('input.postal-code'), validator: @isZip }
    @internationalizeFields()

  cardCallback: (status, data) =>
    if status is 200
      card = new Backbone.Model
      card.url = "#{sd.API_URL}/api/v1/me/credit_cards"
      card.save { token: data.id, provider: 'stripe' },
        success: =>
          success = =>
            @success()
            analytics.track.funnel 'Registration submitted'
          @currentUser.createBidder
            saleId: @model.get('id')
            success: success
            error: (model, xhr) =>
              if xhr.responseJSON?.message is 'Sale is already taken.'
                return success()
              @showError "Registration submission error", xhr
        error: (m, xhr) =>
          @showError xhr.responseJSON.message
      analytics.track.funnel 'Registration card validated'
    else
      @showError data.error.message

  tokenizeViaStripe: =>
    Stripe.setPublishableKey(sd.STRIPE_PUBLISHABLE_KEY)
    creditCardData =
      name: @$('[name="card_name"]').val()
      address_line1: @$('[name="address[street]"]').val()
      address_city: @$('[name="address[city]"]').val()
      address_state: @$('[name="address[region]"]').val()
      address_zip: @$('[name="address[postal_code]"]').val()
      address_country: @$('[name="address[country]"]').val()
      number: @$('[name="card_number"]').val()
      cvc: @$('[name="card_security_code"]').val()
      exp_month: @$('[name="card_expiration_month"]').val()
      exp_year: @$('[name="card_expiration_year"]').val()
    Stripe.card.createToken creditCardData, @cardCallback

  savePhoneNumber: ->
    if @fields.telephone.el.val()?.length > 0
      @currentUser.set(phone: @fields.telephone.el.val()).save()

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'
    analytics.track.funnel 'Registration submit billing address'
    if @validateForm()
      @tokenizeViaStripe()
      @savePhoneNumber()
    else
      @showError 'Please review the error(s) above and try again.'
    false
