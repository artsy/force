_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../../components/mixins/form.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
LoggedOutUser = require '../../../models/logged_out_user.coffee'
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'
Mailcheck = require '../../../components/mailcheck/index.coffee'

module.exports = class PurchaseSignupForm extends Backbone.View
  _.extend @prototype, Form

  initialize: -> #
    @user = new LoggedOutUser

  # initializeMailcheck: ->
  #   Mailcheck.run('#js-mailcheck-input-modal', '#js-mailcheck-hint-modal', false)

  submit: ({ success, error, isWithAccountCallback }) ->
    console.log 'submit signup'

    @user.set (data = @serializeForm())
    @user.related().account.fetch().then =>
      console.log 'hello'
      if @user.isWithAccount()
        console.log 'is with account'
        isWithAccountCallback()
      else
        console.log 'is not with account'
        @signup { success, error }

  signup: ({ success, error }) ->
    @user.signup
      success: =>
        console.log 'sign up success'
        analyticsHooks.trigger "auth:signup"
        @user.repossess @user.id
          success: success?()
          error: error

      error: (model, response, options) =>
        console.log 'sign up error'
        @showError @errorMessage response
        error?()

  showError: (msg) =>
    @$('.js-ap-signup-form-errors').html msg
