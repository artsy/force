import $ from "jquery"
import Backbone from "backbone"
import _ from "underscore"
import Cookies from "cookies-js"
import * as Sentry from "@sentry/browser"
import { data as sd } from "sharify"
import * as globalReactModules from "./global_react_modules"
import { hydrate as hydrateStitch } from "@artsy/stitch/dist/internal/hydrate"
import { initModalManager } from "../../desktop/apps/auth2/client/index"
import { Components } from "@artsy/stitch/dist/internal/types"

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

  if (sd.NEW_AUTH_MODAL) {
    initModalManager()
  }

  mountStitchComponents()
  syncAuth()
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
  require("artsy-gemini-upload")($)

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
  Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })
  const user = sd && sd.CURRENT_USER

  if (sd.CURRENT_USER) {
    Sentry.configureScope(scope => {
      scope.setUser(_.pick(user, "id", "email"))
    })
  }
}

function mountStitchComponents() {
  hydrateStitch({
    sharifyData: sd,
    modules: globalReactModules as Components,
    wrapper: globalReactModules.StitchWrapper,
  })
}
