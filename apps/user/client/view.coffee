Backbone = require 'backbone'

module.exports = class UserSettingsView extends Backbone.View
  descriptions:
    'user/edit': 'This is your general account information on Artsy, all of which is private'
    'collector/edit': 'When contacting galleries for artwork pricing and availability, Artsy will include a brief introduction based on your collector profile.'
    'profile/edit': 'Everything here can be seen by anyone if your public profile is enabled. This allows others to view the artist you follow and the works you save.'

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
