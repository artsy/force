_ = require 'underscore'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
SearchBarView = require '../../search_bar/view.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data
{ isTouchDevice } = require '../../util/device.coffee'
analytics = require '../../../lib/analytics.coffee'
FlashMessage = require '../../flash/index.coffee'
PublishModal = require '../../publish_modal/view.coffee'
Profile = require '../../../models/profile.coffee'

module.exports = class HeaderView extends Backbone.View

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .user-nav-profile-link': 'showProfilePrivateDialog'

  initialize: (options) ->
    { @$window, @$body } = options

    @$welcomeHeader = @$('#main-layout-welcome-header')

    @searchBarView = new SearchBarView
      el: @$('#main-layout-search-bar-container')
      $input: @$('#main-layout-search-bar-input')

    @searchBarView.on 'search:entered', (term) -> window.location = "/search?q=#{term}"
    @searchBarView.on 'search:selected', @searchBarView.selectResult

    if isTouchDevice()
      @removeWelcomeHeader()
    else unless sd.HIDE_HEADER # Already hidden
      @$window.on 'scroll.welcome-header', @checkRemoveWelcomeHeader

    mediator.on 'open:auth', @openAuth, @

    @checkRemoveWelcomeHeader()
    @checkForFlash()

  checkRemoveWelcomeHeader: =>
    if sd.CURRENT_USER or (@$window.scrollTop() > @$welcomeHeader.height())
      unless $('body').hasClass 'is-microsite'
        @removeWelcomeHeader()

  showProfilePrivateDialog: (event) =>
    # Displaying the dialog on tap causes confusion on touch devices
    return if isTouchDevice()

    new Profile(id: sd.CURRENT_USER.default_profile_id).fetch
      success: (profile) =>
        if profile.get('private')
          new PublishModal
            persist: false
            width: '350px'
            name: 'profile_publish_prompt'
            publishEvent: 'profile:make:public'
            message: 'Make your profile public to share.'
          mediator.on 'profile:make:public', @makePublic, @
          false
        else
          window.location = profile.href()

    trackingText = if $(event.target).hasClass('is-profile-text') then 'Profile' else 'Username'
    analytics.track.click "Clicked user dropdown link with text: #{trackingText}"
    false

  makePublic: ->
    new Profile(id: sd.CURRENT_USER.default_profile_id).save { private: false },
      success: (profile) ->
        window.location = profile.href()
    false

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  removeWelcomeHeader: ->
    @$body.addClass 'body-header-fixed'
    @$window.off '.welcome-header'

    unless isTouchDevice()
      @$window.scrollTop(0)

    Cookies.set 'hide-force-header', true, expires: 60 * 60 * 24 * 365

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
