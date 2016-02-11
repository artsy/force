{ USER, PROFILE } = require('sharify').data
Backbone = require 'backbone'
Profile = require '../../../models/profile.coffee'
CurrentUser = require '../../../models/current_user.coffee'
UserEdit = require '../models/user_edit.coffee'
SettingsTabsView = require '../components/tabs/view.coffee'
SettingsView = require '../pages/settings/index.coffee'
ProfileView = require '../pages/profile/index.coffee'
DeleteView = require '../pages/delete/index.coffee'

module.exports = class UserSettingsRouter extends Backbone.Router
  routes:
    'user/edit': 'settings'
    'user/edit#:section': 'settings'
    'profile/edit': 'profile'
    'profile/edit#:section': 'profile'
    'user/delete': 'delete'
    'user/delete#:section': 'delete'

  initialize: ->
    user = new UserEdit USER
    profile = new Profile PROFILE

    @models =
      user: user
      profile: profile

    @$el = $('.js-settings-page')
    @$main = @$el.find '.js-settings-page__content__main'
    @$sections = @$el.find '.js-settings-page__content__sections'

    @tabs = new SettingsTabsView el: @$el

  execute: ->
    @view?.remove()
    @tabs.update()
    super
    @renderSections()

  renderSections: ->
    @$sections.html @view.$el.find('.js-settings-section').map(->
      "<a href='##{$(this).attr 'id'}'>#{$(this).data 'name'}</a>"
    ).get().join ''

  settings: ->
    @view = new SettingsView @models
    @$main.html @view.render().$el

  profile: ->
    @view = new ProfileView @models
    @$main.html @view.render().$el

  delete: ->
    @view = new DeleteView @models
    @$main.html @view.render().$el
