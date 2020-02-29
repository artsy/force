/**
 * Set webpack public-path asset lookup to CDN in production, but only on
 * the client, as we use the assetMiddleware helper to map URLs on the server.
 * @see https://github.com/artsy/force/blob/master/src/lib/middleware/assetMiddleware.ts
 *
 * FIXME: Move this into Circle config and or Docker
 */
if (process.env.NODE_ENV === "production") {
  const { hostname } = window.location
  let cdnUrl

  // Production
  if (hostname === "www.artsy.net") {
    cdnUrl = "https://d1s2w0upia4e9w.cloudfront.net"

    // Localhost
  } else if (hostname === "localhost") {
    cdnUrl = ""

    // Everything else
  } else {
    cdnUrl = "https://d1rmpw1xlv9rxa.cloudfront.net"
  }

  __webpack_public_path__ = cdnUrl + "/assets/"

  // @ts-ignore
  window.__getPublicPath = () => __webpack_public_path__
}

import $ from "jquery"
import Backbone from "backbone"
import _ from "underscore"
import Cookies from "cookies-js"
import * as Sentry from "@sentry/browser"
import { data as sd } from "sharify"
import * as globalReactModules from "./global_react_modules"
import { hydrate as hydrateStitch } from "@artsy/stitch/dist/internal/hydrate"
import { initModalManager } from "desktop/apps/authentication/client/index"
import { Components } from "@artsy/stitch/dist/internal/types"

const mediator = require("./mediator.coffee")
const FlashMessage = require("../components/flash/index.coffee")
const analyticsHooks = require("./analytics_hooks.coffee")
const templateModules = require("./template_modules.coffee")
const listenForInvert = require("../components/eggs/invert/index.coffee")
const listenForBounce = require("../components/eggs/bounce/index.coffee")
const confirmation = require("../components/confirmation/index.coffee")

Backbone.$ = $

require("es7-object-polyfill")

export function globalClientSetup() {
  setupErrorReporting()
  setupJquery()
  setupReferrerTracking()
  listenForInvert()
  listenForBounce()
  confirmation.check()
  initModalManager()
  mountStitchComponents()
  syncAuth()
  mediator.on("auth:logout", logoutEventHandler)
}

export function syncAuth() {
  if (sd.CURRENT_USER) {
    $.ajax({
      url: `${sd.API_URL}/api/v1/me`,
      // success: ensureFreshUser, # this can cause an endless reload
      error() {
        $.ajax({
          method: "DELETE",
          url: "/users/sign_out",
          complete() {
            return window.location.reload()
          },
        })
      },
    })
  }
}

function logoutEventHandler() {
  if (sd.CURRENT_USER) {
    $.ajax({
      url: "/users/sign_out",
      type: "DELETE",
      success() {
        analyticsHooks.trigger("auth:logged-out")
        location.reload()
      },
      error(_xhr, _status, errorMessage) {
        // tslint:disable-next-line:no-unused-expression
        new FlashMessage({ message: errorMessage })
      },
    })
  }
}

function setupReferrerTracking() {
  // Live, document.referrer always exists, but let's check
  // 'document?.referrer?.indexOf' just in case we're in a
  // test that stubs document
  const referrer = document && document.referrer && document.referrer.indexOf

  if (referrer) {
    Cookies.set("force-referrer", document.referrer)
    Cookies.set("force-session-start", window.location.href)
  }
}

function setupJquery() {
  require("typeahead.js/dist/typeahead.bundle.min.js")
  require("jquery.transition")
  require("jquery.fillwidth")
  require("jquery.dotdotdot")
  require("jquery-on-infinite-scroll")
  require("jquery-waypoints/waypoints.js")
  require("jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js")
  const loadTouchEvents = require("jquery-touch-events")
  loadTouchEvents($)

  // For drop down menus that appear on hover you may want that menu to close
  // once you click it. For these cases do `$el.click -> $(@).hidehover()` and
  // the menu will hide and then remove the `display` property so the default
  // CSS will kick in again.
  $.fn.hidehover = function() {
    const $el = $(this)
    $el.css({ display: "none" })
    return setTimeout(() => $el.css({ display: "" }), 200)
  }
  $.ajaxSettings.headers = {
    "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
    "X-ACCESS-TOKEN":
      sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
  }
  for (let key in templateModules) {
    const helper = templateModules[key]
    window[key] = helper
  }
}

function setupErrorReporting() {
  if (sd.NODE_ENV === "production") {
    Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })
    const user = sd && sd.CURRENT_USER

    if (sd.CURRENT_USER) {
      Sentry.configureScope(scope => {
        scope.setUser(_.pick(user, "id", "email"))
      })
    }
  }
}

function mountStitchComponents() {
  hydrateStitch({
    sharifyData: sd,
    modules: globalReactModules as Components,
    wrapper: globalReactModules.StitchWrapper,
  })
}
