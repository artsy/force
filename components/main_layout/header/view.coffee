Backbone        = require 'backbone'
SearchBarView   = require './search_bar/view.coffee'
AuthModalView   = require '../../auth_modal/view.coffee'
mediator        = require '../../../lib/mediator.coffee'
sd              = require('sharify').data
{ isTouchDevice } = require '../../util/device.coffee'
{ readCookie, createCookie } = require '../../util/cookie.coffee'

module.exports = class HeaderView extends Backbone.View

  initialize: (options) ->
    { @$window, @$body } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @searchBarView = new SearchBarView
      el:       @$('#main-layout-search-bar-container')
      $input:   @$('#main-layout-search-bar-input')

    @$window.on 'scroll.welcome-header', @checkRemoveWelcomeHeader
    mediator.on 'open:auth', @openAuth, this
    @checkRemoveWelcomeHeader()

  checkRemoveWelcomeHeader: =>
    if sd.CURRENT_USER or readCookie('hide-force-header') or @$window.scrollTop() > @$welcomeHeader.height()
      @removeWelcomeHeader()

  openAuth: (options) ->
    @modal = new AuthModalView(mode: options.mode, width: '500px')

  removeWelcomeHeader: ->
    @$welcomeHeader.remove()
    @$body.addClass 'body-header-fixed'
    @$window.off '.welcome-header'
    unless isTouchDevice()
      @$window.scrollTop(0)

    createCookie 'hide-force-header', true, 365

  events:
    'click .mlh-login': 'login'
    # Removing this event until we can work out signup bugs
    #'click .mlh-signup': 'signup'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'signup' }

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'login' }
