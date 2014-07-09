Backbone = require 'backbone'

module.exports = class UserSettingsView extends Backbone.View
  descriptions:
    'user/edit': 'This is your general account information and communication preferences.'
    'collector/edit': 'When you contact galleries through Artsy, this information may be shared with them as a brief introduction.'
    'profile/edit': 'This information will be public on Artsy if your public profile is enabled. Enabling your public profile also allows others to view your posts on Artsy and the artists you follow.'

  events:
    'click .garamond-tab': 'changeTab'

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
