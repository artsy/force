{ USER } = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
JumpView = require '../../../components/jump/view.coffee'
SettingsTabsView = require '../components/tabs/view.coffee'
SettingsSectionsView = require '../components/sections/view.coffee'
SettingsView = require '../pages/settings/index.coffee'
ProfileView = require '../pages/profile/index.coffee'
DeleteView = require '../pages/delete/index.coffee'
SavesView = require '../pages/saves/index.coffee'
AuctionsView = require '../pages/auctions/index.coffee'
PaymentsView = require '../pages/payments/index.coffee'

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
    'user/auctions#:section': 'auctions'
    'user/payments': 'payments'
    'user/payments#:section': 'payments'

  initialize: ->
    @user = new CurrentUser USER

    @$el = $('.js-settings-page')
    @$main = @$el.find '.js-settings-page__content__main'
    @$sections = @$el.find '.js-settings-page__content__sections'

    @tabs = new SettingsTabsView el: @$el
    @sections = new SettingsSectionsView el: @$sections

    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    $('body').append @jump.$el

  execute: ->
    @view?.remove()
    @tabs.update()
    super
    @sections.update view: @view

  saves: ->
    @view = new SavesView user: @user
    @$main.html @view.render().$el

  settings: ->
    @view = new SettingsView user: @user
    @$main.html @view.render().$el

  profile: ->
    @view = new ProfileView user: @user
    @$main.html @view.render().$el

  delete: ->
    @view = new DeleteView user: @user
    @$main.html @view.render().$el

  auctions: ->
    @view = new AuctionsView user: @user
    @$main.html @view.render().$el

  payments: ->
    @view = new PaymentsView user: @user
    @$main.html @view.render().$el
