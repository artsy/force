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


module.exports = ->
  try
    jqueryFillwidthLite = require 'jquery-fillwidth-lite'
    imagesLoaded = require 'imagesloaded'
    imagesLoaded.makeJQueryPlugin($)
    jqueryFillwidthLite($, _, imagesLoaded)
  catch error
    # Noop used for tests. No need to setup

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

  # Setup jQuery plugins
  require 'jquery-on-infinite-scroll'

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'type', 'name', 'email', 'phone', 'lab_features',
               'default_profile_id', 'has_partner_access', 'collector_level']
    if not _.isEqual data[attr], sd.CURRENT_USER[attr]
      $.ajax('/user/refresh').then -> window.location.reload()

syncAuth = module.exports.syncAuth = ->
  # Log out of Microgravity if you're not logged in to Gravity
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

setupErrorReporting = ->
  RavenClient.config(sd.SENTRY_PUBLIC_DSN).install()

# Show search button on focusing the search bar
setupHeaderView = ->
  new HeaderView
    el: $('#main-header')
