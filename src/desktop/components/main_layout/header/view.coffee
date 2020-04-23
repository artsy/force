_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../search_bar/view.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data
moment = require 'moment'
{ isTouchDevice } = require '../../util/device.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
FlashMessage = require '../../flash/index.coffee'
PublishModal = require '../../publish_modal/view.coffee'
Profile = require '../../../models/profile.coffee'
activatePulldowns = require '../../hover_pulldown/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Cookies = require '../../cookies/index.coffee'
MobileHeaderView = require './mobile_header_view.coffee'
bundleTemplate = -> require('./templates/bundles.jade') arguments...
{ Following } = require '../../follow_button/index.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "@artsy/reaction/dist/Components/Authentication/Types"
{ AuthIntent, ContextModule } = require "@artsy/cohesion"

module.exports = class HeaderView extends Backbone.View
  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .user-nav-profile-link': 'showProfilePrivateDialog'
    'click .mlh-logout': 'logout'
    'click #main-layout-search-bar-container': 'highlightSearch'
    'blur #main-layout-search-bar-container': 'unhighlightSearch'

  initialize: ->
    @currentUser = CurrentUser.orNull()
    @checkForNotifications()
    @mobileHeaderView = new MobileHeaderView
      el : @$('#main-header-small-screen')

    @searchBarView = new SearchBarView
      el: @$('#main-layout-search-bar-container')
      $input: @$('#main-layout-search-bar-input')
      displayEmptyItem: true
      autoselect: true
      mode: 'suggest'
      limit: 7

    @searchBarView.on 'search:entered', (term) -> window.location = "/search?q=#{term}"
    @searchBarView.on 'search:selected', @searchBarView.selectResult

    activatePulldowns()

  checkForNotifications: =>
    if @currentUser
      @currentUser.fetchNotificationBundles
        success: (result) =>
          totalUnread = result.get('total_unread')
          if result.get('feed').length > 0
            if totalUnread > 0 and (Cookies.get('notification-count') != totalUnread)
              bundleText = if totalUnread >= 100 then "99+" else totalUnread
              @$('.mlh-bundle-count')
                .text("#{bundleText}")
                .show()
              Cookies.set('notification-count', totalUnread)
            for bundle in result.get('feed')
              bundle.date = if moment().isSame(moment(bundle.date),'d') then 'Today' else moment(bundle.date).format('MMM D')
            @$('#hpm-bundles').html bundleTemplate
              bundles: result.get('feed')
          else
            @$('.mlh-notification').addClass 'nohover'
          # Handles switching between user accounts
          if totalUnread < 1
            @$('.mlh-bundle-count').attr('data-visible', false)
            Cookies.expire('notification-count')

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
    analyticsHooks.trigger 'dropdown:link'
    false

  makePublic: ->
    new Profile(id: sd.CURRENT_USER.default_profile_id).save { private: false },
      success: (profile) ->
        window.location = profile.href()
    false

  signup: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.signup, {
      intent: AuthIntent.signup
      contextModule: ContextModule.header
      destination: location.href
    })

  login: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.login, {
      intent: AuthIntent.login
      contextModule: ContextModule.header
      destination: location.href
    })

  logout: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        analyticsHooks.trigger 'auth:logged-out'
        location.reload()
      error: (xhr, status, errorMessage) ->
        new FlashMessage message: errorMessage

  highlightSearch: (e) ->
    if $('#main-layout-search-bar-input').is(':focus')
      $('#main-layout-search-bar-container').addClass('focused')

  unhighlightSearch: (e) ->
    $(e.currentTarget).removeClass('focused')
