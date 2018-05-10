Q = require 'bluebird-q'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ErrorHandlingForm = require('../../../components/credit_card/client/error_handling_form.coffee')
ModalPageView = require '../../../components/modal/page.coffee'

{ API_URL, SESSION_ID, STRIPE_PUBLISHABLE_KEY } = require('sharify').data

module.exports = class RegistrationForm extends ErrorHandlingForm
  deferred = Q.defer()

  events:
    'click .registration-form-content .avant-garde-button-black': 'onSubmit'
    'click .bidding-question': 'showBiddingDialog'
    'change .registration-form-section__checkbox': 'validateAcceptCOS'

  initialize: (options) ->
    @result = deferred.promise
    @success = options.success
    @comboForm = options.comboForm
    @currentUser = CurrentUser.orNull()
    @$acceptCOS = @$('#accept_cos')
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

  disableForm: ->
    @$('.auction-registration-form input, .auction-registration-form select').attr('disabled', true)
    @undelegateEvents()

  cardData: ->
    name: @fields['name on card'].el.val()
    number: @fields['card number'].el.val()
    exp_month: @fields.month.el.first().val()
    exp_year: @fields.year.el.last().val()
    cvc: @fields['security code'].el.val()
    address_line1: @fields.street.el.val()
    address_city: @fields.city.el.val()
    address_state: @fields.state.el.val()
    address_zip: @fields.zip.el.val()
    address_country: @$("select[name='address[country]']").val()

  tokenizeCard: ->
    Q.Promise (resolve, reject) =>
      # Attempt to tokenize the credit card through Stripe
      Stripe.setPublishableKey STRIPE_PUBLISHABLE_KEY
      Stripe.card.createToken @cardData(), (status, data) ->
        if status is 200
          resolve data
        else
          reject data.error.message
    .then (data) =>
      analyticsHooks.trigger 'registration:validated'

      # Save new tokenized credit card for the user
      Q.Promise (resolve, reject) =>
        card = new Backbone.Model
        card.url = "#{API_URL}/api/v1/me/credit_cards"
        card.save { token: data.id, provider: 'stripe' },
          success: (creditCard) =>
            if creditCard.get("address_zip_check") == "fail"
              reject @errors.badZip
            else if creditCard.get("cvc_check") == "fail"
              reject @errors.badSecurityCode
            else
              resolve(creditCard)
          error: (m, xhr) -> reject(xhr.responseJSON?.message)
    .then =>
      # Create the "bidder" model for the user in this sale
      Q.Promise (resolve, reject) =>
        @currentUser.createBidder
          saleId: @model.get('id')
          success: resolve
          error: (model, xhr) ->
            if xhr.responseJSON?.message is 'Sale is already taken.'
              resolve()
            else
              reject "Registration submission error: #{xhr.responseJSON?.message}"
    .then (bidder) =>
      # Executes if registration is successful
      analyticsHooks.trigger 'registration:success', bidder_id: bidder.id
      @disableForm() if @comboForm
      @success()

  savePhoneNumber: ->
    # Always resolves; just delays until the process completes
    Q.Promise (resolve, reject) =>
      if @fields.telephone.el.val()?.length > 0
        @currentUser.set(phone: @fields.telephone.el.val()).save null,
          success: resolve
          error: resolve
      else
        resolve()

  # Lock the form- action.finally() callback executes when form submission is complete regardless of success
  loadingLock: ($element, action) ->
    return if $element.hasClass('is-loading')
    $element.addClass 'is-loading'
    action().finally => $element.removeClass 'is-loading' unless @comboForm

  validateAcceptCOS: (e) ->
    if @$acceptCOS.prop('checked')
      @$('.artsy-checkbox').removeClass('error')
      @$submit.removeClass('is-disabled')
      true
    else
      @$submit.addClass('is-disabled')
      @$('.artsy-checkbox').addClass('error')
      false

  onSubmit: =>
    return unless @validateAcceptCOS()
    analyticsHooks.trigger 'registration:submit-address'
    @loadingLock @$submit, =>
      (if @validateForm() then Q() else Q.reject('Please review the error(s) above and try again.')).then =>
        Q.all [@savePhoneNumber(), @tokenizeCard()]
      .catch (error) =>
        @showError error
      .then =>
        @trigger('submitted')
