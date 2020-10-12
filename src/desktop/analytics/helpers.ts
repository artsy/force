import { extend, omit, pick } from "lodash"
import { data as sd } from "sharify"

/**
 * Format and fire events triggered via react-tracking and cohesion
 */
export const trackEvent = (data: any, options: object = {}) => {
  const actionName = data.action || data.action_type
  const trackingData = omit(data, ["action_type", "action"])

  if (actionName) {
    // Fire only page (not track) when expanding articles
    if (actionName === "Clicked read more") {
      // Send Reaction's read more as a page view
      return onClickedReadMore(data)
    }
    // Grab referrer from our trackingMiddleware in Reaction, since we're in a
    // single-page-app context and the value will need to be refreshed on route
    // change. See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
    const referrer = window.analytics.__artsyClientSideRoutingReferrer
    let trackingOptions = options

    if (referrer) {
      trackingOptions = {
        page: {
          referrer,
        },
      }
    }
    // Send event to segment
    window.analytics.track(actionName, trackingData, trackingOptions)
  } else {
    console.error(
      `Unknown analytics schema being used: ${JSON.stringify(data)}`
    )
  }
}

export const onAnalyticsReady = () => {
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
    window.analytics.identify(sd.CURRENT_USER.id, traits, {
      integrations: { Marketo: false },
    })
  }
}

/**
 * Send a pageview instead of track event when a stub is expanded,
 * for example clicking read more in articles infinite scroll
 */
export const onClickedReadMore = data => {
  const pathname = data.pathname || location.pathname
  const href = window.sd.APP_URL + "/" + pathname
  window.analytics.page(
    { path: pathname },
    { integrations: { Marketo: false } }
  )
  if (window.PARSELY) {
    window.PARSELY.beacon.trackPageView({
      url: href,
      js: 1,
      action_name: "infinite",
    })
  }
  if (window.Sailthru) {
    window.Sailthru.track({
      domain: "horizon.artsy.net",
      spider: true,
      track_url: true,
      url: href,
      use_stored_tags: true,
    })
  }
  // Return early because we don't want to make a Segment call for read more
  return
}
