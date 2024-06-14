import { ActionTypes } from "farce"
import { get } from "Utils/get"
import { match } from "path-to-regexp"
import { getENV } from "Utils/getENV"

/**
 * PageView tracking middleware for use in our router apps. Middleware conforms
 * to Redux middleware spec.
 *
 * @see Artsy/Router/buildClientApp.tsx for mount point
 * @see https://github.com/4Catalyzer/farce/blob/master/src/ActionTypes.js
 */

interface TrackingMiddlewareOptions {
  excludePaths?: string[]
  excludeReferrers?: string[]
}

export function trackingMiddleware(options: TrackingMiddlewareOptions = {}) {
  return store => next => action => {
    const { excludePaths = [], excludeReferrers = [] } = options
    const { type, payload } = action

    switch (type) {
      case ActionTypes.UPDATE_LOCATION: {
        const { pathname } = payload

        // Look in store to see if we've already performed a client-side route
        // transition. If this is null that means we've entered from a SSR pass.
        const clientSideRoutingReferrer = get(
          store.getState(),
          state =>
            state.found.match.location.pathname +
            state.found.match.location.search
        )

        const getFullReferrerUrl = () => {
          const fullReferrerUrl = getENV("APP_URL") + clientSideRoutingReferrer
          return fullReferrerUrl
        }

        // Pluck segment analytics instance from force
        const analytics =
          typeof window.analytics !== "undefined" && window.analytics

        if (analytics) {
          // window.sd.routerReferrer = referrer

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
           * which will read __artsyClientSideRoutingReferrer and update referrer appropriately.
           */

          if (clientSideRoutingReferrer) {
            analytics.__artsyClientSideRoutingReferrer = getFullReferrerUrl()
          }

          const foundExcludedPath = excludePaths.some(excludedPath => {
            const matcher = match(excludedPath, { decode: decodeURIComponent })
            const foundMatch = !!matcher(pathname)
            return foundMatch
          })

          const foundExcludedReferrer = excludeReferrers.some(
            excludedReferrer => {
              const matcher = match(excludedReferrer, {
                decode: decodeURIComponent,
              })
              const foundMatch = !!matcher(clientSideRoutingReferrer)
              return foundMatch
            }
          )

          if (!foundExcludedPath && !foundExcludedReferrer) {
            const url = getENV("APP_URL") + pathname
            const trackingData: {
              path: string
              referrer?: string
              url: string
            } = {
              path: pathname,
              url,
            }

            if (clientSideRoutingReferrer) {
              trackingData.referrer = getFullReferrerUrl()
            }

            window.analytics?.page(trackingData, {
              integrations: {
                Marketo: false,
              },
            })

            if (typeof window._sift !== "undefined") {
              window._sift.push(["_trackPageview"])
            }
          }

          // Reset timers that track time on page since we're tracking each order
          // checkout view as a separate page.
          const desktopPageTimeTrackers =
            typeof window !== "undefined" && window.desktopPageTimeTrackers

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
