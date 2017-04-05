Backbone = require 'backbone'
_ = require 'underscore'
MobileDropdownMenu = require './mobile_dropdown_menu'

module.exports = class MobileHeaderView extends Backbone.View
  events:
    'focus #main-header-search-box': 'showSearchButton'
    'blur #main-header-search-box': 'hideSearchButton'
    'click #main-header-menu-button': 'toggleMenu'

  initialize: ->
    @menu = new MobileDropdownMenu

  showSearchButton: ->
    @$('#main-header-search-button').show()
    @$('#main-header-menu-button').hide()

  hideSearchButton: ->
    setTimeout( =>
      @$('#main-header-search-button').hide()
      @$('#main-header-menu-button').show()
    , 100)

  toggleMenu: (e) ->
    e.preventDefault()
    @menu.toggle()
