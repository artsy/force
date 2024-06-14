import { getContextPageFromClient } from "Server/getContextPage"
import { reportLoadTimeToVolley } from "Server/volley"
import { extend, omit, pick } from "lodash"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { trackTimeOnPage } from "./timeOnPageListener"
import { setAnalyticsClientReferrerOptions } from "./setAnalyticsClientReferrerOptions"
import { subscribeToInAppMessagesByPath } from "Server/analytics/brazeMessagingIntegration"
import { getClientParam } from "Utils/getClientParam"
const Events = require("../../Utils/Events").default

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
    window?.analytics?.track(actionName, trackingData, trackingOptions)
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
  identify()
  subscribeToInAppMessagesByPath()
}

export const setupAnalytics = () => {
  if (getClientParam("disableAnalytics") !== "true") {
    beforeAnalyticsReady()

    window.analytics?.ready(() => {
      onAnalyticsReady()
    })
  }
}

/**
 * Send a pageview instead of track event when a stub is expanded,
 * for example clicking read more in articles infinite scroll
 */
const onClickedReadMore = data => {
  const pathname = data.pathname || location.pathname
  window?.analytics?.page(
    { path: pathname },
    { integrations: { Marketo: false } }
  )
  // Return early because we don't want to make a Segment call for read more
  return
}

/**
 * Dev: print segment requests to the console
 */
const logAnalyticsCalls = () => {
  const mobileText = sd.IS_MOBILE ? "MOBILE " : ""

  // Log all pageviews
  window?.analytics?.on("page", function () {
    console.info(
      `${mobileText}ANALYTICS PAGEVIEW: `,
      arguments[2],
      arguments[3]
    )
  })
  // Log all track calls
  window?.analytics?.on("track", (actionName: string, data?: any) => {
    console.info(`${mobileText}ANALYTICS TRACK:`, actionName, data)
  })
  // Log all identify calls
  window?.analytics?.on(
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
    window?.analytics?.identify(sd?.CURRENT_USER?.id || "", traits, {
      integrations: { Marketo: false },
    })
  }
}

/**
 * Send page load time stats to volley
 */
const trackPageLoadSpeed = () => {
  const contextPage = getContextPageFromClient()

  if (contextPage) {
    const { pageType } = contextPage

    if (
      window.performance &&
      window.performance.timing &&
      sd.TRACK_PAGELOAD_PATHS
    ) {
      window.addEventListener("load", function () {
        if (sd.TRACK_PAGELOAD_PATHS.split("|").includes(pageType)) {
          window.setTimeout(function () {
            let deviceType = sd.IS_MOBILE ? "mobile" : "desktop"
            reportLoadTimeToVolley({ pageType, deviceType })
          }, 0)
        }
      })
    }
  }
}
