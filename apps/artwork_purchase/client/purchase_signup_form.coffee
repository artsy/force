_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../../components/mixins/form.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
User = require '../../../models/user.coffee'
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'
Mailcheck = require '../../../components/mailcheck/index.coffee'
Cookies = require 'cookies-js'

module.exports = class PurchaseSignupForm extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @user }) -> #

  submit: ({ success, error, isWithAccountCallback }) ->
    @user.set (data = @serializeForm())
    @user.prepareForInquiry().then =>
      if @user.isWithAccount()
        isWithAccountCallback()
      else
        @signup { success, error }

  signup: ({ success, error }) ->
    @user.signup
      trigger_login: false
      success: (model, { user }) =>
        analyticsHooks.trigger "purchase:signup:success",
          user: user
        @user.repossess user.id,
          success: ->
            success?()
          error: (model, response, options) =>
            @showError @errorMessage response
            error?()

      error: (model, response, options) =>
        @showError @errorMessage response
        error?()

  showError: (msg) =>
    @$('.js-ap-signup-form-errors').html msg
