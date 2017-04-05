{ USER } = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
JumpView = require '../../../components/jump/view'
SettingsTabsView = require '../components/tabs/view'
SettingsSectionsView = require '../components/sections/view'
SettingsView = require '../pages/settings/index'
ProfileView = require '../pages/profile/index'
DeleteView = require '../pages/delete/index'
SavesView = require '../pages/saves/index'
AuctionsView = require '../pages/auctions/index'
PaymentsView = require '../pages/payments/index'

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
