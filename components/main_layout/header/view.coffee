Backbone        = require 'backbone'
SearchBarView   = require './search_bar/view.coffee'
AuthModalView   = require '../../auth_modal/view.coffee'
mediator        = require '../../../lib/mediator.coffee'

module.exports = class HeaderView extends Backbone.View
  # events:
  #   'click .mlh-login': 'login'
  #   'click .mlh-signup': 'signup'

  initialize: (options) ->
    { @$window, @$body } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @$window.on 'scroll', @hideWelcomeHeader

    @searchBarView = new SearchBarView
      el:       @$('#main-layout-search-bar-container')
      $input:   @$('#main-layout-search-bar-input')

    @$window.on 'scroll', @hideWelcomeHeader
    mediator.on 'open:auth', @openAuth, this

  hideWelcomeHeader: =>
    return if @$window.scrollTop() < @$welcomeHeader.height()

    @$welcomeHeader.hide()
    @$body.addClass('body-header-fixed')
    @$window.off 'scroll', @hideWelcomeHeader

    @$window.scrollTop(0)


  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'signup' }

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'login' }

  openAuth: (options) ->
    @modal = new AuthModalView(mode: options.mode, width: '900px')
