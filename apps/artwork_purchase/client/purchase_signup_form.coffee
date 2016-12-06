_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../../components/mixins/form.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
LoggedOutUser = require '../../../models/logged_out_user.coffee'
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'
Mailcheck = require '../../../components/mailcheck/index.coffee'
Cookies = require 'cookies-js'

module.exports = class PurchaseSignupForm extends Backbone.View
  _.extend @prototype, Form

  initialize: -> #
    @user = new LoggedOutUser

  # initializeMailcheck: ->
  #   Mailcheck.run('#js-mailcheck-input-modal', '#js-mailcheck-hint-modal', false)

  submit: ({ success, error, isWithAccountCallback }) ->
    console.log 'submit'
    @user.set (data = @serializeForm())
    @user.related().account.fetch
      complete: =>
        console.log 'complete'
        console.log @user, @user.isWithAccount()
        if @user.isWithAccount()
          isWithAccountCallback()
        else
          @signup { success, error }

  signup: ({ success, error }) ->
    debugger
    @user.signup
      success: success
        # debugger
        # analyticsHooks.trigger "auth:signup"
        # @user.repossess @user.id,
        #   success: success
        #   error: (model, response, options) =>
        #     @showError @errorMessage response
        #     error?()

      error: (model, response, options) =>
        debugger
        @showError @errorMessage response
        error?()

  showError: (msg) =>
    @$('.js-ap-signup-form-errors').html msg
