#
# Common bootstrap code that needs to be run on the client-side.
#
# Don't go too wild here, we want to keep this minimal and light-weight because it could be
# included across most apps and any uncessary bloat should be avoided.
#

FastClick = require 'fastclick'
sd = require('sharify').data
Cookies = require 'cookies-js'
{ parse } = require 'url'
doc = window.document
CurrentUser = require '../../models/current_user.coffee'
{ globalClientSetup } = require('../../../desktop/lib/global_client_setup.tsx')

module.exports = ->

  # Setup inquiry referrer tracking
  referrerIsArtsy = if sd.APP_URL then doc.referrer.match(parse(sd.APP_URL).host)? else false
  unless referrerIsArtsy
    Cookies.set 'inquiry-referrer', doc.referrer
    Cookies.set 'inquiry-session-start', location.href

  # removes 300ms delay
  if FastClick.attach
    FastClick.attach document.body

  checkForAfterSignUpAction()
  globalClientSetup()
  handleNavBarScroll()

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
