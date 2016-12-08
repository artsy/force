Backbone = require 'backbone'
_ = require 'underscore'
{ ARTWORK } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'
User = require '../../../models/user.coffee'
PurchaseForm = require './purchase_form.coffee'
SignupForm = require './purchase_signup_form.coffee'
successTemplate = ->require('../templates/success.jade') arguments...
AuthModalView = require '../../../components/auth_modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'

class PurchaseView extends Backbone.View

  initialize: ({ @artwork }) ->
    @user = User.instantiate()
    @$button = @$ '.js-ap-summary-submit'

    @purchaseForm = new PurchaseForm
      el: @$ '.js-ap-purchase'
      $button: @$button
      artwork: @artwork
      user: @user
    if @user.isLoggedOut()
      @signupForm = new SignupForm
        el: @$ '.js-ap-signup'
        $button: @$button
        user: @user

  events:
    'submit .js-ap-purchase form'  : 'onSubmit'
    'submit .js-ap-signup form'    : 'onSubmit'
    'click  .js-ap-summary-submit' : 'onSubmit'
    'click  .js-ap-login'          : 'onLoginClick'

  onSubmit: (e) =>
    e.preventDefault()
    @$button.blur()
    if @user.isLoggedIn() then @submitPurchaseForm() else @submitSignupForm()

  onLoginClick: (e) =>
    e.preventDefault()
    @openLoginModal()

  openLoginModal: (copy) ->
    mediator.trigger 'open:auth',
      mode: 'login'
      redirectTo: @artwork.href + '/checkout'
      copy: copy

# Signup
  # Submit

  submitSignupForm: (form, options)->
    # Validate both forms before moving on.
    # Call 'forIsSubmitting' on both forms to disable them both while request is in-flight.
    signupValid = @signupForm.validateForm()
    return if not (@purchaseForm.validateForm() and signupValid)
    return if @signupForm.formIsSubmitting() or @purchaseForm.formIsSubmitting()
    @loadingButton()
    @signupForm.submit
      success: @signupSuccess
      error: @signupError
      isWithAccountCallback: @isWithAccount

  # Callbacks

  signupSuccess: =>
    @purchaseForm.submit
      success: @purchaseSuccess
      error: @purchaseError

  isWithAccount: =>
    @signupForm.reenableForm()
    @purchaseForm.reenableForm()
    @normalButton()
    @openLoginModal "We found an Artsy account associated with #{@user.get 'email'}. Please log in to continue."

  signupError: =>
    @signupForm.reenableForm()
    @purchaseForm.reenableForm()
    @errorButton()

#Purchase
  #Submit

  submitPurchaseForm: (form, options) ->
    return if not @purchaseForm.validateForm()
    return if @purchaseForm.formIsSubmitting()
    @loadingButton()
    @purchaseForm.submit
      success: @purchaseSuccess
      error: @purchaseError

  #Callbacks

  purchaseSuccess: =>
    window.location = @artwork.href + '/thank-you'

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
