/**
 * NOTE: This file has been deprecated as all new JS code lives in `src/v2`.
 * The following only applies to older apps in src/desktop.
 */
import "lib/webpackPublicPath"
import $ from "jquery"
import Backbone from "backbone"
import _ from "lodash"
import Cookies from "cookies-js"
import { configureScope } from "@sentry/browser"
import { data as sd } from "sharify"
import * as globalReactModules from "./global_react_modules"
import { hydrate as hydrateStitch } from "@artsy/stitch/dist/internal/hydrate"
import { initAuthModalContainer } from "v2/Utils/initAuthModalContainer"
import { Components } from "@artsy/stitch/dist/internal/types"
import { omit } from "lodash"
import syncAuth from "lib/syncAuth"
import { mediator } from "lib/mediator"
import type { LogoutEventOptions } from "lib/mediator"
import * as templateModules from "./template_modules"
import { setupSentryClient } from "lib/setupSentryClient"

const FlashMessage = require("../components/flash/index.coffee")
const listenForInvert = require("../components/eggs/invert/index.coffee")
const listenForBounce = require("../components/eggs/bounce/index.coffee")
const confirmation = require("../components/confirmation/index.coffee")

Backbone.$ = $

require("es7-object-polyfill")

export function deprecatedGlobalClientSetup() {
  setupErrorReporting()
  setupJquery()
  setupReferrerTracking()
  listenForInvert()
  listenForBounce()
  confirmation.check()
  initAuthModalContainer()
  mountStitchComponents()
  syncAuth()
  trackAuthenticationEvents()
  mediator.on("auth:logout", logoutEventHandler)
}

export const logoutEventHandler = (options?: LogoutEventOptions) => {
  const redirectPath = options?.redirectPath
  $.ajax({
    error(_xhr, _status, errorMessage) {
      // tslint:disable-next-line:no-unused-expression
      new FlashMessage({ message: errorMessage })
    },
    success() {
      if (window.analytics && window.analytics.reset) {
        // guard for aggressive ad blockers
        window.analytics.reset()
      }
      if (redirectPath) {
        location.assign(redirectPath)
      } else {
        location.reload()
      }
    },
    type: "DELETE",
    url: "/users/sign_out",
  })
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
  $.fn.hidehover = function () {
    const $el = $(this)
    $el.css({ display: "none" })
    return setTimeout(() => $el.css({ display: "" }), 200)
  }
  $.ajaxSettings.headers = {
    "X-ACCESS-TOKEN":
      sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
    "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
  }
  for (let key in templateModules) {
    const helper = templateModules[key]
    window[key] = helper
  }
}

function setupErrorReporting() {
  if (sd.NODE_ENV === "production") {
    setupSentryClient(sd)

    const user = sd && sd.CURRENT_USER

    if (sd.CURRENT_USER) {
      configureScope(scope => {
        scope.setUser(_.pick(user, "id", "email"))
      })
    }
  }
}

function mountStitchComponents() {
  hydrateStitch({
    modules: globalReactModules as Components,
    sharifyData: sd,
    wrapper: globalReactModules.StitchWrapper,
  })
}

/**
 * Track signups and account creation via social services
 * Look for a pre-set cookie containing analytics info after login
 *
 * Cookies are set while authenticating
 * See desktop/apps/authentication/components/ModalContainer
 */
export function trackAuthenticationEvents() {
  const modes = ["login", "signup"]
  const user = sd && sd.CURRENT_USER

  modes.forEach(mode => {
    if (Cookies.get(`analytics-${mode}`)) {
      const data = JSON.parse(Cookies.get(`analytics-${mode}`))
      Cookies.expire(`analytics-${mode}`)

      if (user) {
        const { action } = data
        const analyticsOptions = omit(data, "action")
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        window.analytics.track(action, {
          ...analyticsOptions,
          user_id: user && user.id,
        })
        analyticsIdentify(user)
      }
    }
  })
}

function analyticsIdentify(user) {
  // FIXME: add typings for user
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.identify(user.id, user.email, {
    integrations: {
      All: false,
      Marketo: true,
    },
  })
}
