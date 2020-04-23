{ invoke } = require 'underscore'
Backbone = require 'backbone'
PasswordView = require '../../components/password/view.coffee'
InformationView = require '../../components/information/view.coffee'
LinkedAccountsView = require '../../components/linked_accounts/view.coffee'
EmailPreferencesView = require '../../components/email_preferences/view.coffee'
template = -> require('./index.jade') arguments...
sd = require('sharify').data

module.exports = class SettingsView extends Backbone.View
  subViews: []

  initialize: ({ @user }) -> #

  postRender: ->
    informationView = new InformationView model: @user, user: @user
    @$('.js-settings-section__main--information')
      .html informationView.render().$el

    passwordView = new PasswordView user: @user
    @$('.js-settings-section__main--password')
      .html passwordView.render().$el

    linkedAccountsView = new LinkedAccountsView user: @user
    @$('.js-settings-section__main--linked-accounts')
      .html linkedAccountsView.render().$el

    emailPreferencesView = new EmailPreferencesView model: @user, user: @user
    @$('.js-settings-section__main--email-preferences')
      .html emailPreferencesView.render().$el

    @subViews = [
      informationView
      passwordView
      linkedAccountsView
      emailPreferencesView
    ]

  render: ->
    @$el.html template
      user: @user
      stitch: sd.stitch
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
