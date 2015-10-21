_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
SubForm = require './sub_form.coffee'
template = -> require('../templates/account.jade') arguments...
crypto = require 'crypto'

module.exports = class AccountForm extends Backbone.View
  className: 'settings-account-form'

  events:
    'click .settings-toggle-service': 'toggleService'
    'click .settings-toggle-password': 'togglePasswordForm'

  initialize: (options = {}) ->
    @location = location
    { @userEdit } = options

    @password = new Backbone.Model id: 1 # Force PUT
    @password.url = "#{API_URL}/api/v1/me/password"
    @listenTo @password, 'sync', @togglePasswordForm

  togglePasswordForm: ->
    (@$password ?= $('#settings-change-password-current, #settings-change-password-new'))
      .toggle()

  toggleService: (e) ->
    $target = $(e.currentTarget).attr 'data-state', 'loading'
    @toggleLinked $target, $target.data('service')

  toggleLinked: ($button, service) ->
    if @userEdit.isLinkedTo service
      @userEdit.unlinkAccount service,
        success: ->
          $button.attr 'data-state': null, 'data-connected': 'disconnected'
        error: (model, response, options) =>
          @$('#settings-auth-errors').text response.responseJSON.error
          $button.attr 'data-state', null
    else
      csrfHash = crypto.createHash('sha1').update(@userEdit.get 'accessToken').digest('hex')
      @location.assign "/users/auth/#{service}?" +
        "redirect-to=#{encodeURIComponent(@location.href)}&" +
        "state=#{csrfHash}"

  setupForms: ->
    # Changing your password logs you out so we direct to login after changing password
    changePasswordSuccess = -> _.delay (-> @location.assign '/log_in?redirect_uri=/user/edit'), 300

    @detailsForm = new SubForm el: @$('#settings-account-details'), model: @userEdit, user: @userEdit
    @passwordForm = new SubForm el: @$('#settings-change-password-new'), model: @password, user: @userEdit, afterSuccess: changePasswordSuccess
    @emailPreferencesForm = new SubForm el: @$('#settings-email-preferences'), model: @userEdit, user: @userEdit

  postRender: ->
    @setupForms()

  render: ->
    @$el.html template(user: @userEdit)
    @postRender()
    this

  remove: ->
    @detailsForm.remove()
    @passwordForm.remove()
    super
