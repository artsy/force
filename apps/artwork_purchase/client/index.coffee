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
    @loggedIn = CurrentUser.orNull()?

    @$button = @$ '.js-ap-summary-submit'

    @purchaseForm = new PurchaseForm
      el: @$ '.js-ap-purchase'
      $button: @$button
      artwork: @artwork

    if not @loggedIn
      @signupForm = new SignupForm
        el: @$ '.js-ap-signup'
        $button: @$button

  events:
    'submit .js-ap-purchase form'  : 'onSubmit'
    'submit .js-ap-signup form'    : 'onSubmit'
    'click  .js-ap-summary-submit' : 'onSubmit'

  onSubmit: (e) =>
    e.preventDefault()
    @$button.blur()
    console.log 'onSubmit'
    if @loggedIn then @submitPurchaseForm() else @submitSignupForm()

# Signup
  # Submit

  submitSignupForm: (form, options)->
    console.log 'submit signup'
    # Validate both forms before moving on.
    # Call 'forIsSubmitting' on both forms to disable them both while request is in-flight.
    signupValid = @signupForm.validateForm()
    return if not (@purchaseForm.validateForm() and signupValid)
    console.log @purchaseForm.validateForm()
    return if @signupForm.formIsSubmitting() or @purchaseForm.formIsSubmitting()
    console.log 'submit signup 2'
    @loadingButton()
    @signupForm.submit
      success: @signupSuccess
      error: @signupError
      isWithAccountCallback: @isWithAccount

  # Callbacks

  signupSuccess: =>
    debugger
    @purchaseForm.submit
      success: @purchaseSuccess
      error: @purchaseError

  isWithAccount: =>
    @signupForm.reenableForm()
    @purchaseForm.reenableForm()
    @normalButton()
    return new AuthModalView
      width: '500px',
      mode: 'login'
      redirect: @artwork.href + '/checkout'

  signupError: =>
    debugger
    @signupForm.reenableForm()
    @purchaseForm.reenableForm()
    @errorButton()

#Purchase
  #Submit

  submitPurchaseForm: (form, options) ->
    console.log 'submit purchase'
    return if not @purchaseForm.validateForm()
    return if @purchaseForm.formIsSubmitting()
    @loadingButton()
    @purchaseForm.submit
      success: @purchaseSuccess
      error: @purchaseError

  #Callbacks

  purchaseSuccess: =>
    debugger
    window.location = @artwork.href + '/thank-you'

  purchaseError: =>
    debugger
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
