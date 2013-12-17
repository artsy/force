Backbone        = require 'backbone'
SearchBarView   = require './search_bar/view.coffee'
AuthModalView   = require '../../auth_modal/view.coffee'
mediator        = require '../../../lib/mediator.coffee'

module.exports = class HeaderView extends Backbone.View

  initialize: (options) ->
    { @$window, @$body } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @$userNav = @$('#main-layout-header-user-nav')
    @searchBarView = new SearchBarView
      el:       @$('#main-layout-search-bar-container')
      $input:   @$('#main-layout-search-bar-input')

    @$window.on 'scroll.welcome-header', @hideWelcomeHeader
    mediator.on 'open:auth', @openAuth, this

  openAuth: (options) ->
    @modal = new AuthModalView(mode: options.mode, width: '500px')

  hideWelcomeHeader: =>
    return if @$window.scrollTop() < @$welcomeHeader.height()

    @$welcomeHeader.hide()
    @$body.addClass('body-header-fixed')
    @$window.off '.welcome-header'

    @$window.scrollTop(0)

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'mouseenter .header-user-name': 'showUserNav'
    'mouseleave #main-layout-header-user-nav' : 'hideUserNav'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'signup' }

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'login' }

  hideUserNav: => @$userNav.hide()
  showUserNav: =>
    #Analytics.hover("Hovered over user dropdown")
    @$userNav.show()
