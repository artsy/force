#
# CLient-side code that runs **everywhere**. STOP! Think if what you're about
# to include in this file can actually live somewhere else like a relavent app
# or component.
#

Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
Cookies = require 'cookies-js'
imagesLoaded = require 'imagesloaded'
sd = require('sharify').data
mediator = require './mediator.coffee'
analytics = require './analytics.coffee'
templateModules = require './template_modules.coffee'
setupAuctionReminder = require '../components/auction_reminders/index.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
listenForInvert = require '../components/eggs/invert/index.coffee'
listenForBounce = require '../components/eggs/bounce/index.coffee'

module.exports = ->
  setupJquery()
  setupReferrerTracking()
  syncAuth()
  setupAuctionReminder()
  listenForInvert()
  listenForBounce()
  setupAnalytics()

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'type', 'name', 'email', 'phone', 'lab_features',
               'default_profile_id', 'has_partner_access', 'collector_level']
    if not _.isEqual data[attr], sd.CURRENT_USER[attr]
      $.ajax('/user/refresh').then -> window.location.reload()

syncAuth = module.exports.syncAuth = ->
  # Log out of Force if you're not logged in to Gravity
  if sd.CURRENT_USER
    $.ajax
      url: "#{sd.API_URL}/api/v1/me"
      success: ensureFreshUser
      error: ->
        $.ajax
          method: 'DELETE'
          url: '/users/sign_out'
          complete: ->
            window.location.reload()

setupAnalytics = ->
  window.analytics?.ready ->
    analytics(mixpanel: (mixpanel ? null), ga: ga)
    analytics.registerCurrentUser()
  # Log a visit once per session
  unless Cookies.get('active_session')?
    Cookies.set 'active_session', true
    mediator.trigger 'session:start'
    analytics.track.funnel if sd.CURRENT_USER
      'Visited logged in'
    else
      'Visited logged out'

setupReferrerTracking = ->
  # Live, document.referrer always exists, but let's check
  # 'document?.referrer?.indexOf' just in case we're in a
  # test that stubs document
  if document?.referrer?.indexOf and document.referrer.indexOf(sd.APP_URL) < 0
    Cookies.set 'force-referrer', document.referrer
    Cookies.set 'force-session-start', window.location.href

setupJquery = ->
  require '../node_modules/typeahead.js/dist/typeahead.bundle.min.js'
  require 'jquery.transition'
  require 'jquery.fillwidth'
  require 'jquery.dotdotdot'
  require 'jquery-on-infinite-scroll'
  require './vendor/waypoints.js'
  require './vendor/waypoints-sticky.js'
  require './jquery/hidehover.coffee'
  require('artsy-gemini-upload') $
  require('jquery-fillwidth-lite')($, _, imagesLoaded)
  $.ajaxSettings.headers =
    'X-XAPP-TOKEN': sd.ARTSY_XAPP_TOKEN
    'X-ACCESS-TOKEN': sd.CURRENT_USER?.accessToken
  window[key] = helper for key, helper of templateModules
