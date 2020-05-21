import { trackExperimentViewed } from "v2/Artsy/Analytics/trackExperimentViewed"
import ActionTypes from "farce/lib/ActionTypes"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"
import { match } from "path-to-regexp"

/**
 * PageView tracking middleware for use in our router apps. Middleware conforms
 * to Redux middleware spec.
 *
 * @see Artsy/Router/buildClientApp.tsx for mount point
 * @see https://github.com/4Catalyzer/farce/blob/master/src/ActionTypes.js
 */

interface TrackingMiddlewareOptions {
  excludePaths?: string[]
}

export function trackingMiddleware(options: TrackingMiddlewareOptions = {}) {
  return store => next => action => {
    const { excludePaths = [] } = options
    const { type, payload } = action

    switch (type) {
      case ActionTypes.UPDATE_LOCATION: {
        const { pathname } = payload
        const referrer = get(
          store.getState(),
          state =>
            state.found.match.location.pathname +
            state.found.match.location.search
        )

        // Pluck segment analytics instance from force
        const analytics =
          typeof window.analytics !== "undefined" && window.analytics

        if (analytics) {
          // TODO: Pass referrer over to Artwork page if A/B test passes
          // window.sd.routerReferrer = referrer

          const foundExcludedPath = excludePaths.some(excludedPath => {
            const matcher = match(excludedPath, { decode: decodeURIComponent })
            const foundMatch = !!matcher(pathname)
            return foundMatch
          })

          if (!foundExcludedPath) {
            const url = sd.APP_URL + pathname
            const trackingData: {
              path: string
              referrer?: string
              url: string
            } = {
              path: pathname,
              url,
            }

            if (referrer) {
              trackingData.referrer = sd.APP_URL + referrer
            }

            // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
            if (
              ["/collect", "/collections", "/collection/"].some(path =>
                pathname.includes(path)
              ) &&
              referrer
            ) {
              trackingData.referrer = sd.APP_URL + referrer
            }

            /**
             * Store a global reference to the referrer. Since we're in an SPA
             * context we'll need to use this to track referrers statefully across
             * pages, since we don't do a hard reload.
             *
             * Attaching to the analytics object in the absence of a more
             * "global" location.
             *
             * For our new reaction apps, all tracking goes through this location:
             * https://github.com/damassi/force/blob/399919f7ef053701f0ed3b20b32dddf0490459b0/src/desktop/assets/analytics.coffee#L41
             * which will read __artsyReferrer and update referrer appropriately.
             */
            const finalReferrer = trackingData.referrer
            analytics.__artsyReferrer = finalReferrer

            analytics.page(trackingData, {
              integrations: {
                Marketo: false,
              },
            })

            // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
            if (sd.CLIENT_NAVIGATION_V5) {
              trackExperimentViewed("client_navigation_v5", trackingData)
            }
          }

          // Reset timers that track time on page since we're tracking each order
          // checkout view as a separate page.
          const desktopPageTimeTrackers =
            typeof window.desktopPageTimeTrackers !== "undefined" &&
            window.desktopPageTimeTrackers

          if (desktopPageTimeTrackers) {
            desktopPageTimeTrackers.forEach(tracker => {
              // No need to reset the tracker if we're on the same page.
              if (pathname !== tracker.path) {
                tracker.reset(pathname)
              }
            })
          }
        }

        return next(action)
      }
      default:
        return next(action)
    }
  }
}
