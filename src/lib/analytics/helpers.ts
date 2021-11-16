import { getContextPageFromClient } from "lib/getContextPage"
import { reportLoadTimeToVolley } from "lib/volley"
import { extend, omit, pick } from "lodash"
import { data as sd } from "sharify"
import { trackTimeOnPage } from "./timeOnPageListener"
import { setAnalyticsClientReferrerOptions } from "./setAnalyticsClientReferrerOptions"
const setupSplitTests = require("../../desktop/components/split_test/setup.coffee")
const Events = require("../../v2/Utils/Events").default

/**
 * Format and fire events triggered via react-tracking and cohesion
 */
export const trackEvent = (data: any, options: object = {}) => {
  const actionName = data.action || data.action_type
  const trackingData = omit(data, ["action_type", "action"])

  if (actionName) {
    // Fire only page (not track) when expanding articles
    if (actionName === "Clicked read more") {
      // Send read more event as a page view
      return onClickedReadMore(data)
    }
    const trackingOptions = setAnalyticsClientReferrerOptions(options)

    // Send event to segment
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track(actionName, trackingData, trackingOptions)
  } else {
    console.error(
      `Unknown analytics schema being used: ${JSON.stringify(data)}`
    )
  }
}

/**
 * Global analytics code that needs to run before page load and analytics.ready
 */
export const beforeAnalyticsReady = () => {
  // intercept react-tracking events and send to segment
  Events.onEvent(trackEvent)
  // send page load time stats to volley
  trackPageLoadSpeed()
  // set up timeOnPage listers
  trackTimeOnPage()

  if (sd.SHOW_ANALYTICS_CALLS) {
    logAnalyticsCalls()
  }
}

/**
 * Global analytics code that needs to run after analytics.ready
 */
export const onAnalyticsReady = () => {
  setupSplitTests()
  identify()
}

/**
 * Send a pageview instead of track event when a stub is expanded,
 * for example clicking read more in articles infinite scroll
 */
const onClickedReadMore = data => {
  const pathname = data.pathname || location.pathname
  const href = window.sd.APP_URL + "/" + pathname
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.page(
    { path: pathname },
    { integrations: { Marketo: false } }
  )
  // guard for aggressive ad blockers
  if (
    window.PARSELY &&
    window.PARSELY.beacon &&
    window.PARSELY.beacon.trackPageView
  ) {
    window.PARSELY.beacon.trackPageView({
      action_name: "infinite",
      js: 1,
      url: href,
    })
  }
  // Return early because we don't want to make a Segment call for read more
  return
}

/**
 * Dev: print segment requests to the console
 */
const logAnalyticsCalls = () => {
  const mobileText = sd.IS_MOBILE ? "MOBILE " : ""

  // Log all pageviews
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.on("page", function () {
    console.info(
      `${mobileText}ANALYTICS PAGEVIEW: `,
      arguments[2],
      arguments[3]
    )
  })
  // Log all track calls
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.on("track", (actionName: string, data?: any) => {
    console.info(`${mobileText}ANALYTICS TRACK:`, actionName, data)
  })
  // Log all identify calls
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.on(
    "identify",
    (userId: string, data: object, context: any) => {
      console.info(`${mobileText}ANALYTICS IDENTIFY:`, userId, data, context)
    }
  )
}

/**
 * Fire identify events if user is present
 */
const identify = () => {
  if (sd.CURRENT_USER != null ? sd.CURRENT_USER.id : undefined) {
    const allowedlist = [
      "collector_level",
      "default_profile_id",
      "email",
      "id",
      "name",
      "phone",
      "type",
    ]
    const traits = extend(pick(sd.CURRENT_USER, allowedlist), {
      session_id: sd.SESSION_ID,
    })
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.identify(sd.CURRENT_USER.id, traits, {
      integrations: { Marketo: false },
    })
  }
}

/**
 * Send page load time stats to volley
 */
const trackPageLoadSpeed = () => {
  const { pageType } = getContextPageFromClient()

  if (
    window.performance &&
    window.performance.timing &&
    sd.TRACK_PAGELOAD_PATHS
  ) {
    window.addEventListener("load", function () {
      if (sd.TRACK_PAGELOAD_PATHS.split("|").includes(pageType)) {
        window.setTimeout(function () {
          let deviceType = sd.IS_MOBILE ? "mobile" : "desktop"
          reportLoadTimeToVolley(pageType, deviceType)
        }, 0)
      }
    })
  }
}
