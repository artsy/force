Backbone = require 'backbone'
_ = require 'underscore'
{ ARTWORK } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
PurchaseForm = require './purchase_form.coffee'
SignupForm = require './purchase_signup_form.coffee'
successTemplate = ->require('../templates/success.jade') arguments...
AuthModalView = require '../../../components/auth_modal/view.coffee'

class PurchaseView extends Backbone.View

  initialize: ({ @artwork }) ->
    @$button = @$ '.js-ap-summary-submit'

    @purchaseForm = new PurchaseForm
      el: @$ '.js-ap-purchase'
      $button: @$button
      artwork: @artwork

    if @needsSignup()
      @signupForm = new SignupForm
        el: @$ '.js-ap-signup'
        $button: @$button

  needsSignup: ->
    not CurrentUser.orNull()

  events:
    'submit .js-ap-purchase form'  : 'onSubmit'
    'submit .js-ap-signup form'    : 'onSubmit'
    'click  .js-ap-summary-submit' : 'onSubmit'

  onSubmit: (e) =>
    @$button.blur()
    return if not @validateForms()
    return if @formsAreSubmitting()
    e.preventDefault()
    @submit()

  validateForms: ->
    valid = @purchaseForm.validateForm()
    valid = (@signupForm.validateForm() and valid) if @needsSignup()
    return valid

  formsAreSubmitting: ->
    purchaseSubmitting = @purchaseForm.formIsSubmitting()
    return if @needsSignup() then @signupForm.formIsSubmitting() else purchaseSubmitting

  submit: ->
    @loadingButton()

    submitPurchase = @purchaseForm.submit
      success: @purchaseSucces
      error: @purchaseError

    return submitPurchase() if not @needsSignup()

    @signupForm.submit
      success: submitPurchase
      error: @signupError
      isWithAccountCallback: @isWithAccount

# Signup Callbacks

  isWithAccount: =>
    @normalButton()
    return new AuthModalView
      width: '500px',
      mode: 'login'

  signupError: =>
    @signupForm.reenableForm()
    @purchaseForm.reenableForm()
    @errorButton()

#Purchase Callbacks

  purchaseSuccess: =>
    Backbone.history.navigate @artwork.href + '/thank-you', replace: true
    $('.body-artwork-purchase').removeClass 'minimal-header'
    @$el.html successTemplate { @artwork }
    $('html,body').scrollTop(0);

  purchaseError: =>
    @purchaseForm.reenableForm()
    @errorButton()

# Button State

  normalButton: ->
    @$button.attr 'data-state', 'ok'
    @$button.prop 'disabled', false

  loadingButton: ->
    @$button.attr 'data-state', 'loading'
    @$button.prop 'disabled', true

  errorButton: ->
    @$button.attr 'data-state', 'error'
    @$button.prop 'disabled', false

module.exports.init = ->
  Backbone.history.start pushState: true
  new PurchaseView { artwork: ARTWORK, el: $('#purchase-page') }
