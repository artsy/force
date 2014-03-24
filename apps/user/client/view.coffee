_           = require 'underscore'
sd          = require('sharify').data
AccountForm = require './account_form.coffee'
Backbone    = require 'backbone'
Profile     = require '../../../models/profile.coffee'
UserEdit    = require '../../../models/user_edit.coffee'

module.exports.UserSettingsView = class UserSettingsView extends Backbone.View

  initialize: (options) ->
    @profile = new Profile sd.PROFILE
    @$toggleEls = @$('.garamond-tab, .settings-form')
    @accountForm = new AccountForm el: @$('.settings-account-form'), model: @model

  events:
    'click .garamond-tab'   : 'onTabClick'
    'click .settings-submit': 'onSubmitButtonClick'

  onTabClick: (event) ->
    return false if $(event.target).is '.is-active'
    @$toggleEls.toggleClass 'is-active'
    false

  onSubmitButtonClick: (event) ->
    false


module.exports.init = ->

  new UserSettingsView
    el   : $('#settings')
    model: new UserEdit sd.USER_EDIT
