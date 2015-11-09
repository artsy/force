_ = require 'underscore'
SubForm = require './sub_form.coffee'

module.exports = class EmailPreferencesForm extends SubForm

  events: -> _.extend super,
    'click #receive_emails': 'changeEmailSubscription'

  initialize: (options = {}) ->
    { @model, @user, @afterSuccess } = options
    @cacheSelectors()

    @configureEmailSubscriptions(@model.get('receive_emails'))

  changeEmailSubscription: (event) ->
    receiveEmails = if $(event.target).is ':checked' then true else false
    @configureEmailSubscriptions(receiveEmails)

  configureEmailSubscriptions: (enable) ->
    @$('.email_subscriptions input').prop('disabled', !enable)
    opacity = if enable then 1 else 0.3
    @$('.email_subscriptions label').fadeTo("slow", opacity)
