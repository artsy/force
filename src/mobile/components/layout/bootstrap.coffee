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
HeaderView = require './client/header_view.coffee'
doc = window.document
sharify = require('sharify')
CurrentUser = require '../../models/current_user.coffee'
Sentry = require("@sentry/browser")
globalReactModules = require('../../../desktop/lib/global_react_modules.tsx')
hydrateStitch = require('@artsy/stitch/dist/internal/hydrate').hydrate

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
  setupHeaderView()
  syncAuth()
  checkForAfterSignUpAction()

  # Setup jQuery plugins
  require 'jquery-on-infinite-scroll'
  if sd.stitch?.renderQueue?
    mountStitch()
  
mountStitch = ->
  hydrateStitch({
    sharifyData: sd
    modules: globalReactModules
    wrapper: globalReactModules.StitchWrapper
  })

syncAuth = module.exports.syncAuth = ->
  # Log out of Microgravity if you're not logged in to Gravity
  if sd.CURRENT_USER
    $.ajax
      url: "#{sd.API_URL}/api/v1/me"
      # success: ensureFreshUser # this can cause an endless reload
      error: ->
        $.ajax
          method: 'DELETE'
          url: '/users/sign_out'
          complete: ->
            window.location.reload()

setupErrorReporting = ->
  Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })

# Show search button on focusing the search bar
setupHeaderView = ->
  new HeaderView
    el: $('#main-header')

operations =
  save: (currentUser, objectId) ->
    currentUser.initializeDefaultArtworkCollection()
    currentUser.defaultArtworkCollection().saveArtwork objectId

  follow: (currentUser, objectId, kind) ->
    kind? and currentUser.follow(objectId, kind)

  editorialSignup: (currentUser) ->
    fetch "/signup/editorial",
      method: "POST"
      body: JSON.stringify email: currentUser.get("email")
      headers: new Headers 'Content-Type': 'application/json'
      credentials: 'same-origin'

checkForAfterSignUpAction = ->
  afterSignUpAction = Cookies.get 'afterSignUpAction'
  @currentUser = CurrentUser.orNull()
  if afterSignUpAction
    return unless @currentUser
    { action, objectId, kind } = JSON.parse(afterSignUpAction)

    ops = operations[action]
    ops and ops(@currentUser, objectId, kind)

    Cookies.expire 'afterSignUpAction'
