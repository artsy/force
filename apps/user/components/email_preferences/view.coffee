{ extend } = require 'underscore'
GenericFormView = require '../generic_form/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class EmailPreferencesView extends GenericFormView
  className: 'settings-email-preferences'

  events: -> extend {}, super,
    'click input': 'change'
    'click input[name="receive_emails"]': 'toggleSubscriptions'

  initialize: ({ @model, @user }) ->
    @__toggleSubscriptions__ @model.get 'receive_emails'

  subscriptions: ->
    @__subscriptions__ ?= @$('.js-settings-email-preferences__subscriptions input')

  __toggleSubscriptions__: (checked = true) ->
    @$el.attr 'data-enabled', checked
    @subscriptions().prop 'disabled', not checked

  toggleSubscriptions: (e) ->
    checked = @$(e.currentTarget).is ':checked'
    @__toggleSubscriptions__ checked

  render: ->
    @$el.html template
      user: @user
    this
