Backbone = require 'backbone'
_ = require 'underscore'
{ ARTWORK, CURRENT_USER } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
PurchaseForm = require './purchase_form.coffee'
SignupForm = require './purchase_signup_form.coffee'
successTemplate = ->require('../templates/success.jade') arguments...
mediator = require '../../../lib/mediator.coffee'
Cookies = require '../../../components/cookies/index.coffee'
Sticky = require '../../../components/sticky/index.coffee'

class PurchaseView extends Backbone.View

  initialize: ({ @artwork }) ->
    @$button = @$ '.js-ap-summary-submit'
    sticky = new Sticky
    sticky.add $('.js-ap-summary')
    sticky.rebuild()

    @purchaseForm = new PurchaseForm
      el: @$ '.js-ap-purchase'
      $button: @$button
      artwork: @artwork

    unless CURRENT_USER
      @signupForm = new SignupForm
        el: @$ '.js-ap-signup'
        $button: @$button

  events:
    'submit .js-ap-purchase form'  : 'onSubmit'
    'submit .js-ap-signup form'    : 'onSubmit'
    'click  .js-ap-summary-submit' : 'onSubmit'
    'click  .js-ap-login'          : 'onLoginClick'

  onSubmit: (e) =>
    e.preventDefault()
    @$button.blur()
    if CURRENT_USER then @submitPurchaseForm() else @submitSignupForm()

  onLoginClick: (e) =>
    e.preventDefault()
    @openLoginModal()

  openLoginModal: (copy) ->
    mediator.trigger 'open:auth',
      mode: 'login'
      redirectTo: @artwork.href + '/checkout'
      copy: copy
      intent: 'purchase'

    formData = _.extend {
      artwork_id: @artwork.id,
      fair_id: @artwork.fair?.id
    }, @purchaseForm.serializeForm()
    Cookies.set 'purchase-inquiry', JSON.stringify formData

  # Signup and submit
  submitSignupForm: (form, options) ->
    # Validate both forms before moving on.
    # Call 'forIsSubmitting' on both forms to disable them both while request is in-flight.
    signupValid = @signupForm.validateForm()
    unless (@purchaseForm.validateForm() and signupValid)
      analyticsHooks.trigger "purchase:inquiry:failure",
        artwork: @artwork
        message: "client-side form validation failed"
      return

    return if @signupForm.formIsSubmitting() or @purchaseForm.formIsSubmitting()
    @loadingButton()
    @signupForm.submit
      success: @signupSuccess
      error: @signupError
      isWithAccountCallback: @isWithAccount

  # Callbacks

  signupSuccess: (user) =>
    analyticsHooks.trigger "purchase:signup:success", user: user
    @purchaseForm.submit {
      user,
      success: @purchaseSuccess,
      error: @purchaseError
    }

  isWithAccount: (loggedOutUser) =>
    analyticsHooks.trigger "purchase:inquiry:failure",
      artwork: @artwork
      message: "user already exists, login required"
    @reenableForm @signupForm
    @reenableForm @purchaseForm
    @normalButton()
    @openLoginModal "We found an Artsy account associated with #{loggedOutUser.get 'email'}. Please log in to continue."

  signupError: (errorMessage) =>
    analyticsHooks.trigger "purchase:inquiry:failure",
      artwork: @artwork
      message: errorMessage
    @reenableForm @signupForm
    @reenableForm @purchaseForm
    @errorButton()

#Purchase
  #Submit

  submitPurchaseForm: (form, options) ->
    unless @purchaseForm.validateForm()
      analyticsHooks.trigger "purchase:inquiry:failure",
        artwork: @artwork
        message: "client-side form validation failed"
        user: CURRENT_USER
      return
    return if @purchaseForm.formIsSubmitting()
    @loadingButton()
    @purchaseForm.submit
      user: CURRENT_USER
      success: @purchaseSuccess
      error: @purchaseError

  #Callbacks

  purchaseSuccess: (inquiry, fairAction)=>
    Cookies.expire 'purchase-inquiry'
    window.location = @artwork.href + '/thank-you'

  purchaseError: =>
    @reenableForm @purchaseForm
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

  reenableForm: (form) ->
    form.reenableForm undefined, reset: false

module.exports.init = ->
  return if not window.location.pathname.match(/.*\/checkout/)
  new PurchaseView { artwork: ARTWORK, el: $('#purchase-page') }
