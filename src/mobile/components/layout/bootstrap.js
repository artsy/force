/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// Common bootstrap code that needs to be run on the client-side.
//
// Don't go too wild here, we want to keep this minimal and light-weight because it could be
// included across most apps and any uncessary bloat should be avoided.
//

require("jquery")
const Backbone = require("backbone")
Backbone.$ = $

const FastClick = require("fastclick")
const sd = require("sharify").data
const Cookies = require("cookies-js")
const { parse } = require("url")
const doc = window.document
const CurrentUser = require("../../models/current_user")
const { init } = require("@sentry/browser")
const globalReactModules = require("../../../desktop/lib/global_react_modules.tsx")
const hydrateStitch = require("@artsy/stitch/dist/internal/hydrate").hydrate
const { mediator } = require("../../../lib/mediator")
const syncAuth = require("../../../lib/syncAuth.ts").default
const {
  logoutEventHandler,
} = require("../../../desktop/lib/deprecated_global_client_setup.tsx")
const { loadSegment } = require("../../../lib/analytics/segmentOneTrustIntegration")

export const bootstrap = function () {
  // Add the Gravity XAPP or access token to all ajax requests
  $.ajaxSettings.headers = {
    "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
    "X-ACCESS-TOKEN":
      sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
  }

  // Setup inquiry referrer tracking
  const referrerIsArtsy = sd.APP_URL
    ? doc.referrer.match(parse(sd.APP_URL).host) != null
    : false
  if (!referrerIsArtsy) {
    Cookies.set("inquiry-referrer", doc.referrer)
    Cookies.set("inquiry-session-start", location.href)
  }

  // removes 300ms delay
  if (FastClick.attach) {
    FastClick.attach(document.body)
  }

  setupErrorReporting()
  syncAuth()
  checkForAfterSignUpAction()
  mediator.on("auth:logout", logoutEventHandler)

  loadSegment()

  // Setup jQuery plugins
  require("jquery-on-infinite-scroll")
  require("jquery.transition") // This is required for FlashMessage
  if ((sd.stitch != null ? sd.stitch.renderQueue : undefined) != null) {
    mountStitch()
  }

  return handleNavBarScroll()
}

const mountStitch = () =>
  hydrateStitch({
    sharifyData: sd,
    modules: globalReactModules,
    wrapper: globalReactModules.StitchWrapper,
  })

const setupErrorReporting = () => init({ dsn: sd.SENTRY_PUBLIC_DSN })

const operations = {
  save(currentUser, objectId) {
    currentUser.initializeDefaultArtworkCollection()
    return currentUser.defaultArtworkCollection().saveArtwork(objectId)
  },

  follow(currentUser, objectId, kind) {
    return kind != null && currentUser.follow(objectId, kind)
  },
}

const checkForAfterSignUpAction = function () {
  const afterSignUpAction = Cookies.get("afterSignUpAction")
  const currentUser = CurrentUser.orNull()
  if (afterSignUpAction) {
    if (!currentUser) {
      return
    }
    const { action, objectId, kind } = JSON.parse(afterSignUpAction)

    const ops = operations[action]
    ops && ops(currentUser, objectId, kind)

    return Cookies.expire("afterSignUpAction")
  }
}

const handleNavBarScroll = function () {
  // We only need this special case when the user sees the "login/signup"
  // banner on mobile web.
  if (!CurrentUser.orNull()) {
    const $mainNav = $("#header-content #main-layout-header")
    const $loginSignupBanner = $("#header-content .login-signup")

    return window.addEventListener("scroll", function () {
      if ($(window).scrollTop() > $loginSignupBanner.outerHeight()) {
        $loginSignupBanner.css("display", "none")
        return $mainNav.css("position", "fixed")
      } else {
        $loginSignupBanner.css("display", "block")
        return $mainNav.css("position", "relative")
      }
    })
  }
}
