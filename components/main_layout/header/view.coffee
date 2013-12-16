Backbone        = require 'backbone'
SearchBarView   = require './search_bar/view.coffee'
AuthModalView   = require '../../auth_modal/view.coffee'
mediator        = require '../../../lib/mediator.coffee'

module.exports = class HeaderView extends Backbone.View

  initialize: (options) ->
    { @$window, @$body } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @$window.on 'scroll', @hideWelcomeHeader

    @searchBarView = new SearchBarView
      el:       @$('#main-layout-search-bar-container')
      $input:   @$('#main-layout-search-bar-input')

    @$window.on 'scroll', @hideWelcomeHeader
    mediator.on 'open:auth', @openAuth, this

  openAuth: (options) ->
    @modal = new AuthModalView(mode: options.mode, width: '500px')

  hideWelcomeHeader: =>
    return if @$window.scrollTop() < @$welcomeHeader.height()

    @$welcomeHeader.hide()
    @$body.addClass('body-header-fixed')
    @$window.off 'scroll', @hideWelcomeHeader

    @$window.scrollTop(0)

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'signup' }

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'login' }
