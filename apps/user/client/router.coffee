{ USER, PROFILE } = require('sharify').data
Backbone = require 'backbone'
Profile = require '../../../models/profile.coffee'
CurrentUser = require '../../../models/current_user.coffee'
UserEdit = require '../models/user_edit.coffee'
SettingsTabsView = require '../components/tabs/view.coffee'
SettingsSectionsView = require '../components/sections/view.coffee'
SettingsView = require '../pages/settings/index.coffee'
ProfileView = require '../pages/profile/index.coffee'
DeleteView = require '../pages/delete/index.coffee'
SavesView = require '../pages/saves/index.coffee'
AuctionsView = require '../pages/auctions/index.coffee'

module.exports = class UserSettingsRouter extends Backbone.Router
  routes:
    'user/edit': 'settings'
    'user/edit#:section': 'settings'
    'profile/edit': 'profile'
    'profile/edit#:section': 'profile'
    'user/delete': 'delete'
    'user/delete#:section': 'delete'
    'user/saves': 'saves'
    'user/saves#:section': 'saves'
    'user/auctions': 'auctions'

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
    @sections = new SettingsSectionsView el: @$sections

  execute: ->
    @view?.remove()
    @tabs.update()
    super
    @sections.update view: @view

  saves: ->
    @view = new SavesView @models
    @$main.html @view.render().$el

  settings: ->
    @view = new SettingsView @models
    @$main.html @view.render().$el

  profile: ->
    @view = new ProfileView @models
    @$main.html @view.render().$el

  delete: ->
    @view = new DeleteView @models
    @$main.html @view.render().$el

  auctions: ->
    @view = new AuctionsView @models
    @$main.html @view.render().$el
