Backbone = require 'backbone'

module.exports = class UserSettingsView extends Backbone.View
  descriptions:
    'user/edit': 'This is your general account information and communication preferences.'
    'collector/edit': 'When you contact galleries through Artsy, this information may be shared with them as a brief introduction.'
    'profile/edit': 'This information will be public on Artsy if your public profile is enabled. Enabling your public profile also lets others view the number of users that follow you.'

  events:
    'click .garamond-tab': 'changeTab'
    'click #receive_emails': 'changeEmailSubscription'

  initialize: (options = {}) ->
    { @profile, @userEdit } = options

  renderDescription: ->
    @$('#settings-description').text @descriptions[Backbone.history.fragment]

  deactivateTabs: ->
    (@$tabs ?= @$('.garamond-tab')).removeClass 'is-active'

  activateCurrentTab: ->
    @deactivateTabs()
    @renderDescription()
    @$("a[href='/#{Backbone.history.fragment}']").addClass 'is-active'

  changeTab: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  changeEmailSubscription: (event) ->
    receive_emails = if $(event.target).is ':checked' then true else false
    $('#settings-email-preferences input').not(event.target).prop('disabled', !receive_emails)
    opacity = if receive_emails then 1 else 0.3
    $('#settings-email-preferences label').not("label[for=#{event.target.id}]").fadeTo("slow", opacity)


