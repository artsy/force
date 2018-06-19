#
# CLient-side code that runs **everywhere**. STOP! Think if what you're about
# to include in this file can actually live somewhere else like a relavent app
# or component.
#

$ = require 'jquery'
Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
{ uniqBy } = require 'lodash'
Cookies = require 'cookies-js'
imagesLoaded = require 'imagesloaded'
Raven = require 'raven-js'
sd = require('sharify').data
mediator = require './mediator.coffee'
templateModules = require './template_modules.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
listenForInvert = require '../components/eggs/invert/index.coffee'
listenForBounce = require '../components/eggs/bounce/index.coffee'
confirmation = require '../components/confirmation/index.coffee'
globalReactModules = require('./global_react_modules')
{ componentRenderer } = require('@artsy/stitch/iso')
{ initModalManager } = require('../../desktop/apps/auth2/client/index')

module.exports = ->
  setupErrorReporting()
  setupJquery()
  setupReferrerTracking()
  syncAuth()
  listenForInvert()
  listenForBounce()
  confirmation.check()
  initModalManager() if sd.NEW_AUTH_MODAL
  mountStitchBlocks()

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'type', 'name', 'email', 'phone', 'lab_features',
               'default_profile_id', 'has_partner_access', 'collector_level']

    # NOTE:
    # If any of the above props have changed between two routes, and the second
    # route fails to mount sd.locals.CURRENT_USER with the latest req.user.fetch()
    # data, a hard refresh will occur once the client-side mounts as the two
    # will be out of sync.

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

setupJquery = ->
  require 'typeahead.js/dist/typeahead.bundle.min.js'
  require 'jquery.transition'
  require 'jquery.fillwidth'
  require 'jquery.dotdotdot'
  require 'jquery-on-infinite-scroll'
  require 'jquery-waypoints/waypoints.js'
  require 'jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js'
  require '../../../node_modules/jquery-touch-events/src/jquery.mobile-events.min.js'
  require('artsy-gemini-upload') $

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

setupErrorReporting = ->
  Raven.config(sd.SENTRY_PUBLIC_DSN).install()
  Raven.setUserContext _.pick(user, 'id', 'email') if user = sd.CURRENT_USER

mountStitchBlocks = ->
  {components, mountOnClient} = componentRenderer({
    mode: 'client',
    modules: globalReactModules
  })

  sd.stitch.renderQueue.forEach (block) ->
    mountOnClient(block)

  # Mount renderer for runtime client-side templates. NOTE: must be included
  # in template when rendering data; e.g., html = myTemplate({ data, reaction })
  sd.stitch.components = components

