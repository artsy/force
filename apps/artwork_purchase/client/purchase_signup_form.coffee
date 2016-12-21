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

  submit: ( options ) ->
    @loggedOutUser.set (data = @serializeForm())
    @loggedOutUser.save {},
      silent: true
      success: =>
        @fetchAccount options
      error: (model, response) =>
        errorMessage = @errorMessage response
        @showError errorMessage
        options.error?(errorMessage)

  fetchAccount: ({ success, error, isWithAccountCallback }) =>
    complete = =>
      if @loggedOutUser.isWithAccount()
        isWithAccountCallback @loggedOutUser
      else
        @signup { success, error }

    @loggedOutUser.related().account.fetch
      silent: true
      success: complete
      error: complete

  signup: ({ success, error }) ->
    @loggedOutUser.signup
      trigger_login: false
      success: ( model, { user } )->
        success?(user)

      error: (model, response) =>
        errorMessage = @errorMessage response
        @showError errorMessage
        error?(errorMessage)

  showError: (msg) =>
    @$('.js-ap-signup-form-errors').html msg
