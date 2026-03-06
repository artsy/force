import { get } from "Utils/get"
import { getENV } from "Utils/getENV"
import { ActionTypes } from "farce"
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
  excludeReferrers?: string[]
}

export function trackingMiddleware(options: TrackingMiddlewareOptions = {}) {
  // Referrer saved from an excluded path so the next tracked pageview
  // can attribute the navigation to the original source, making redirects
  // through excluded intermediate paths transparent to analytics.
  let savedReferrer: string | null = null

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
            state.found.match.location.search,
        )

        // Pluck segment analytics instance from force
        const analytics =
          typeof window.analytics !== "undefined" && window.analytics

        if (analytics) {
          const foundExcludedPath = excludePaths.some(excludedPath => {
            const matcher = match(excludedPath, { decode: decodeURIComponent })
            const foundMatch = !!matcher(pathname)
            return foundMatch
          })

          if (foundExcludedPath) {
            // Preserve the referrer from before the excluded path so the
            // next tracked pageview attributes correctly to the original source.
            if (!savedReferrer && clientSideRoutingReferrer) {
              savedReferrer = clientSideRoutingReferrer
            }

            return next(action)
          }

          // Use the saved referrer when coming from an excluded redirect,
          // otherwise fall back to the store's current location.
          const effectiveReferrer = savedReferrer || clientSideRoutingReferrer
          savedReferrer = null

          const getFullReferrerUrl = () => {
            return getENV("APP_URL") + effectiveReferrer
          }

          /**
           * Store a global reference to the referrer. Since we're in an SPA
           * context we'll need to use this to track referrers statefully across
           * pages, since we don't do a hard reload.
           *
           * Attaching to the analytics object in the absence of a more
           * "global" location.
           */
          if (effectiveReferrer) {
            analytics.__artsyClientSideRoutingReferrer = getFullReferrerUrl()
          }

          const foundExcludedReferrer = excludeReferrers.some(
            excludedReferrer => {
              const matcher = match(excludedReferrer, {
                decode: decodeURIComponent,
              })
              const foundMatch = !!matcher(effectiveReferrer)
              return foundMatch
            },
          )

          if (!foundExcludedReferrer) {
            const url = getENV("APP_URL") + pathname
            const trackingData: {
              path: string
              referrer?: string
              url: string
            } = {
              path: pathname,
              url,
            }

            if (effectiveReferrer) {
              trackingData.referrer = getFullReferrerUrl()
            } else if (window.__artsyInitialReferrer) {
              // consume then clear to avoid recording stale external referrer
              trackingData.referrer = window.__artsyInitialReferrer
              window.__artsyInitialReferrer = undefined
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
