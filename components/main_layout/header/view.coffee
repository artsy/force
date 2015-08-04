_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../search_bar/view.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data
moment = require 'moment'
{ isTouchDevice } = require '../../util/device.coffee'
analytics = require '../../../lib/analytics.coffee'
FlashMessage = require '../../flash/index.coffee'
PublishModal = require '../../publish_modal/view.coffee'
Profile = require '../../../models/profile.coffee'
activatePulldowns = require '../../hover_pulldown/index.coffee'
maybePopUpPolicyNotice = require './policy.coffee'
dealWithWelcomeBanner = require '../../welcome_banner/index.coffee'
bundleTemplate = -> require('./templates/bundles.jade') arguments...

module.exports = class HeaderView extends Backbone.View
  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .user-nav-profile-link': 'showProfilePrivateDialog'
    'click .mlh-logout': 'logout'

  initialize: ->
    maybePopUpPolicyNotice()
    dealWithWelcomeBanner()
    @checkForNotifications()
    @searchBarView = new SearchBarView
      el: @$('#main-layout-search-bar-container')
      $input: @$('#main-layout-search-bar-input')
      displayEmptyItem: true
      autoselect: true
      mode: 'suggest'
      limit: 7

    @searchBarView.on 'search:entered', (term) -> window.location = "/search?q=#{term}"
    @searchBarView.on 'search:selected', @searchBarView.selectResult

    mediator.on 'open:auth', @openAuth, @

    @checkForFlash()

    activatePulldowns()

  checkForNotifications: =>
    if sd.CURRENT_USER
      $.ajax
        method: 'GET'
        url: "#{sd.API_URL}/api/v1/me/notifications/feed"
        data: size: 100
        success: (result) =>
          if result.total_unread > 0
            bundleText = if result.total_unread >= 100 then "99+" else result.total_unread
            $('.mlh-bundle-count')
              .text("#{bundleText}")
              .show()
            for bundle in result.feed
              bundle.date = if moment().isSame(moment(bundle.date),'d') then 'Today' else moment(bundle.date).format('MMM D')
            $('#hpm-bundles').html bundleTemplate
              bundles: result.feed
          else
            $('.mlh-notification').addClass 'nohover'

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

  signup: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked sign up via the header'
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked login via the header'
    mediator.trigger 'open:auth', mode: 'login'

  logout: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked logout via the header'
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        location.reload()
      error: (xhr, status, errorMessage) ->
        new FlashMessage message: errorMessage

  checkForFlash: ->
    if sd.FLASH
      new FlashMessage message: sd.FLASH
