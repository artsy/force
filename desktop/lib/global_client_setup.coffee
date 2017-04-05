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
rg4js = require 'raygun4js'
sd = require('sharify').data
mediator = require './mediator'
templateModules = require './template_modules'
setupAuctionReminder = require '../components/auction_reminders/index'
setupSplitTests = require '../components/split_test/setup'
listenForInvert = require '../components/eggs/invert/index'
listenForBounce = require '../components/eggs/bounce/index'
confirmation = require '../components/confirmation/index'

module.exports = ->
  setupJquery()
  setupReferrerTracking()
  syncAuth()
  setupAuctionReminder()
  listenForInvert()
  listenForBounce()
  confirmation.check()
  setupRaygun()

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

setupReferrerTracking = ->
  # Live, document.referrer always exists, but let's check
  # 'document?.referrer?.indexOf' just in case we're in a
  # test that stubs document
  if document?.referrer?.indexOf and document.referrer.indexOf(sd.APP_URL) < 0
    Cookies.set 'force-referrer', document.referrer
    Cookies.set 'force-session-start', window.location.href

setupRaygun = ->
  if sd.RAYGUN_KEY
    rg4js 'enableCrashReporting', true
    rg4js 'apiKey', sd.RAYGUN_KEY

setupJquery = ->
  require 'typeahead.js/dist/typeahead.bundle.min.js'
  require 'jquery.transition'
  require 'jquery.fillwidth'
  require 'jquery.dotdotdot'
  require 'jquery-on-infinite-scroll'
  require 'jquery-waypoints/waypoints.js'
  require 'jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js'
  require 'jquery-touch-events/src/jquery.mobile-events.min.js'
  require('artsy-gemini-upload') $
  require('jquery-fillwidth-lite')($, _, imagesLoaded)
  # For drop down menus that appear on hover you may want that menu to close
  # once you click it. For these cases do `$el.click -> $(@).hidehover()` and
  # the menu will hide and then remove the `display` property so the default
  # CSS will kick in again.
  $.fn.hidehover = ->
    $el = $(@)
    $el.css(display: 'none')
    setTimeout (-> $el.css display: ''), 200
  $.ajaxSettings.headers =
    'X-XAPP-TOKEN': sd.ARTSY_XAPP_TOKEN
    'X-ACCESS-TOKEN': sd.CURRENT_USER?.accessToken
  window[key] = helper for key, helper of templateModules
