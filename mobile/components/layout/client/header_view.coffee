Backbone = require 'backbone'
appBanner = require '../../app_banner/index.coffee'
MainDropdownMenu = require '../../main_dropdown_menu/index.coffee'

module.exports = class HeaderView extends Backbone.View
  events:
    'focus #main-header-search-box': 'showSearchButton'
    'blur #main-header-search-box': 'hideSearchButton'
    'click #main-header-menu': 'toggleMenu'

  initialize: ->
    appBanner()
    @menu = new MainDropdownMenu

  showSearchButton: ->
    @$('#main-header-search-button').show()
    @$('#main-header-menu').hide()

  hideSearchButton: ->
    @$('#main-header-search-button').hide()
    @$('#main-header-menu').show()

  toggleMenu: (e) ->
    e.preventDefault()
    @menu.toggle()
