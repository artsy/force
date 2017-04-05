{ extend } = require 'underscore'
GenericFormView = require '../generic_form/view'
template = -> require('./index.jade') arguments...

module.exports = class EmailPreferencesView extends GenericFormView
  className: 'settings-email-preferences'

  attributes: ->
    'data-enabled': @model.get('receive_emails')

  events: extend GenericFormView::events,
    'click input': 'change'
    'click input[name="receive_emails"]': 'toggleSubscriptions'

  initialize: ({ @model, @user }) -> #

  enableSubscriptions: (checked = true) ->
    @$el.attr 'data-enabled', checked
    @$('.js-settings-email-preferences__subscriptions input')
      .prop 'disabled', not checked

  toggleSubscriptions: (e) ->
    checked = @$(e.currentTarget).is ':checked'
    @enableSubscriptions checked

  render: ->
    @$el.html template
      user: @model
    this
