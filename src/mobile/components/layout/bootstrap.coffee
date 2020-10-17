#
# Common bootstrap code that needs to be run on the client-side.
#
# Don't go too wild here, we want to keep this minimal and light-weight because it could be
# included across most apps and any uncessary bloat should be avoided.
#

require 'jquery'
Backbone = require 'backbone'
Backbone.$ = $

_ = require 'underscore'
FastClick = require 'fastclick'
RavenClient = require 'raven-js'
sd = require('sharify').data
Cookies = require 'cookies-js'
{ parse } = require 'url'
doc = window.document
sharify = require('sharify')
CurrentUser = require '../../models/current_user'
Sentry = require("@sentry/browser")
globalReactModules = require('../../../desktop/lib/global_react_modules.tsx')
hydrateStitch = require('@artsy/stitch/dist/internal/hydrate').hydrate
mediator = require('../../../desktop/lib/mediator.coffee')
syncAuth = require('../../../lib/syncAuth.ts').default
{ logoutEventHandler } = require('../../../desktop/lib/global_client_setup.tsx')

module.exports = ->
  # Add the Gravity XAPP or access token to all ajax requests
  $.ajaxSettings.headers = {
    "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN
    "X-ACCESS-TOKEN": sd.CURRENT_USER?.accessToken
  }

  # Setup inquiry referrer tracking
  referrerIsArtsy = if sd.APP_URL then doc.referrer.match(parse(sd.APP_URL).host)? else false
  unless referrerIsArtsy
    Cookies.set 'inquiry-referrer', doc.referrer
    Cookies.set 'inquiry-session-start', location.href

  # removes 300ms delay
  if FastClick.attach
    FastClick.attach document.body

  setupErrorReporting()
  syncAuth()
  checkForAfterSignUpAction()
  mediator.on('auth:logout', logoutEventHandler)

  # Setup jQuery plugins
  require 'jquery-on-infinite-scroll'
  require 'jquery.transition' # This is required for FlashMessage
  if sd.stitch?.renderQueue?
    mountStitch()

  handleNavBarScroll()

mountStitch = ->
  hydrateStitch({
    sharifyData: sd
    modules: globalReactModules
    wrapper: globalReactModules.StitchWrapper
  })

setupErrorReporting = ->
  Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })

operations =
  save: (currentUser, objectId) ->
    currentUser.initializeDefaultArtworkCollection()
    currentUser.defaultArtworkCollection().saveArtwork objectId

  follow: (currentUser, objectId, kind) ->
    kind? and currentUser.follow(objectId, kind)

checkForAfterSignUpAction = ->
  afterSignUpAction = Cookies.get 'afterSignUpAction'
  @currentUser = CurrentUser.orNull()
  if afterSignUpAction
    return unless @currentUser
    { action, objectId, kind } = JSON.parse(afterSignUpAction)

    ops = operations[action]
    ops and ops(@currentUser, objectId, kind)

    Cookies.expire 'afterSignUpAction'

handleNavBarScroll = ->
  # We only need this special case when the user sees the "login/signup"
  # banner on mobile web.
  if !CurrentUser.orNull()
    $mainNav = $("#header-content #main-layout-header")
    $loginSignupBanner = $('#header-content .login-signup')

    window.addEventListener "scroll", () ->
      if $(window).scrollTop() > $loginSignupBanner.outerHeight()
        $loginSignupBanner.css('display', 'none')
        $mainNav.css('position', 'fixed')
      else
        $loginSignupBanner.css('display', 'block')
        $mainNav.css('position', 'relative')
