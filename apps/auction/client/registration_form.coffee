sd                 = require('sharify').data
Backbone           = require 'backbone'
analytics          = require '../../../lib/analytics.coffee'
Marketplace        = require '../../../models/marketplace.coffee'
CurrentUser        = require '../../../models/current_user.coffee'
ErrorHandlingForm  = require('../../../components/credit_card/client/error_handling_form.coffee')
ModalPageView      = require '../../../components/modal/page.coffee'

{ SESSION_ID } = require('sharify').data

module.exports = class RegistrationForm extends ErrorHandlingForm

  balanced: false

  events:
    'click .registration-form-content .avant-garde-button-black' : 'onSubmit'
    'click .bidding-question' : 'showBiddingDialog'

  initialize: (options) ->
    @success = options.success
    @currentUser = CurrentUser.orNull()
    @$submit = @$('.registration-form-content .avant-garde-button-black')
    @setUpFields()

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width  : '700px'
      pageId : 'auction-info'

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

  cardCallback: (response) =>
    if response.status == 201
      card      = new Backbone.Model
      card.url  = "#{sd.API_URL}/api/v1/me/credit_cards"
      card.save token: response.data.uri,
        success: =>
          @currentUser.createBidder
            saleId: @model.get('id')
            success: =>
              @success()
              analytics.track.funnel 'Registration submitted'
            error: (xhr) =>
              @showError "Registration submission error", xhr
        error: =>
          @showError "Error adding your credit card", response
      analytics.track.funnel 'Registration card validated'
    else
      @showError "Registration card - other error", response

  cardData: ->
    name: @fields['name on card'].el.val()
    card_number: @fields['card number'].el.val()
    expiration_month: @fields.month.el.first().val()
    expiration_year: @fields.year.el.last().val()
    security_code: @fields['security code'].el.val()
    street_address: @fields.street.el.val()
    postal_code: @fields.zip.el.val()
    country: @$("select[name='billing_address[country]']").val()

  tokenizeCard: =>
    marketplace = new Marketplace
    marketplace.fetch
      success: (marketplace) =>
        @balanced ||= require('../../../lib/vendor/balanced.js')
        @balanced.init marketplace.get('uri')
        @balanced.card.create @cardData(), @cardCallback
      error: (xhr) =>
        @showError "Error fetching the balanced marketplace", xhr

  savePhoneNumber: ->
    if @fields.telephone.el.val()?.length > 0
      @currentUser.set(phone: @fields.telephone.el.val()).save()

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analytics.track.funnel 'Registration submit billing address'

    if @validateForm()
      @tokenizeCard()
      @savePhoneNumber()
    else
      @showError 'Please review the error(s) above and try again.'
    false
