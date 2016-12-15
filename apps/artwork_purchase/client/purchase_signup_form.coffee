_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Form = require '../../../components/mixins/form.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'
Mailcheck = require '../../../components/mailcheck/index.coffee'
Cookies = require 'cookies-js'
LoggedOutUser = require '../../../models/logged_out_user.coffee'

module.exports = class PurchaseSignupForm extends Backbone.View
  _.extend @prototype, Form

  initialize: -> #
    @loggedOutUser = new LoggedOutUser

  submit: ({ success, error, isWithAccountCallback }) ->
    @loggedOutUser.set (data = @serializeForm())
    @loggedOutUser.prepareForInquiry().then =>

    userLookup = @loggedOutUser.findOrCreate silent: true
      .then =>
        Q.promise (resolve) =>
          @loggedOutUser.related().account.fetch
            silent: true
            success: resolve
            error: resolve

    userLookup.then =>
      if @loggedOutUser.isWithAccount()
        isWithAccountCallback()
      else
        @signup { success, error }

  signup: ({ success, error }) ->
    @loggedOutUser.signup
      trigger_login: false
      success: success
      error: (model, response, options) =>
        @showError @errorMessage response
        error?()

      error: (model, response, options) =>
        @showError @errorMessage response
        error?()

  showError: (msg) =>
    @$('.js-ap-signup-form-errors').html msg
