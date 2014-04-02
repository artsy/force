_                   = require 'underscore'
Backbone            = require 'backbone'
SearchBarView       = require '../../search_bar/view.coffee'
AuthModalView       = require '../../auth_modal/view.coffee'
mediator            = require '../../../lib/mediator.coffee'
sd                  = require('sharify').data
{ isTouchDevice }   = require '../../util/device.coffee'
{ createCookie }    = require '../../util/cookie.coffee'
analytics           = require '../../../lib/analytics.coffee'
FlashMessage        = require '../../flash/index.coffee'

module.exports = class HeaderView extends Backbone.View
  events:
    'click .mlh-login'  : 'login'
    'click .mlh-signup' : 'signup'

  initialize: (options) ->
    { @$window, @$body } = options

    @$welcomeHeader = @$('#main-layout-welcome-header')

    @searchBarView = new SearchBarView
      el     : @$('#main-layout-search-bar-container')
      $input : @$('#main-layout-search-bar-input')

    @searchBarView.on 'search:entered', (term) -> window.location = "/search?q=#{term}"
    @searchBarView.on 'search:selected', @searchBarView.selectResult

    if isTouchDevice()
      @removeWelcomeHeader()
    else unless sd.HIDE_HEADER # Already hidden
      @$window.on 'scroll.welcome-header', @checkRemoveWelcomeHeader

    mediator.on 'open:auth', @openAuth, this

    @checkRemoveWelcomeHeader()
    @checkForFlash()

  checkRemoveWelcomeHeader: =>
    if sd.CURRENT_USER or (@$window.scrollTop() > @$welcomeHeader.height())
      unless $('body').hasClass 'is-microsite'
        @removeWelcomeHeader()

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  removeWelcomeHeader: ->
    @$body.addClass 'body-header-fixed'
    @$window.off '.welcome-header'

    unless isTouchDevice()
      @$window.scrollTop(0)

    createCookie 'hide-force-header', true, 365

  signup: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked sign up via the header'
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked login via the header'
    mediator.trigger 'open:auth', mode: 'login'

  checkForFlash: ->
    if sd.FLASH
      new FlashMessage message: sd.FLASH
