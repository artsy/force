import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { isDevelopment } from "Utils/device"
import { getENV } from "Utils/getENV"
import take from "lodash/take"
import { useCallback } from "react"
import { fetchQuery } from "react-relay"
import type { OperationType, Subscription } from "relay-runtime"

interface UsePrefetchRouteProps {
  initialPath?: string
  onComplete?: () => void
}

export const usePrefetchRoute = ({
  initialPath,
  onComplete,
}: UsePrefetchRouteProps = {}): {
  prefetch: (path?: string) => Array<Subscription | null> | null
} => {
  const { relayEnvironment } = useSystemContext()

  const { match } = useRouter()

  const prefetchFeatureFlagEnabled = getENV("ENABLE_PREFETCH")

  // If we're transitioning routes, we don't want to prefetch
  const prefetchDisabled = !prefetchFeatureFlagEnabled || !match?.elements

  const prefetch = useCallback(
    (path = initialPath) => {
      if (prefetchDisabled) {
        return null
      }

      if (!path) {
        return null
      }

      const routes = take(findRoutesByPath({ path }), 2)

      const querySubscriptions = routes.map(foundRoute => {
        if (!foundRoute || !foundRoute.route) {
          return null
        }

        const {
          match: { params },
          route: { serverCacheTTL },
        } = foundRoute

        const {
          route: { query, prepareVariables },
        } = foundRoute

        const variables = (() => {
          if (!prepareVariables) {
            return params
          }

          return prepareVariables(params, match) as OperationType["variables"]
        })()

        const isPrefetchable = !!(query && variables)

        if (!isPrefetchable) {
          return null
        }

        const subscription = fetchQuery(
          relayEnvironment,
          query,
          { ...variables, isPrefetched: true }, // Inject a variable to indicate this is a prefetch
          {
            fetchPolicy: "store-or-network",
            networkCacheConfig: {
              force: false,
              metadata: {
                maxAge: serverCacheTTL,
              },
            },
          },
        ).subscribe({
          start: () => {
            if (isDevelopment) {
              console.log("[usePrefetchRoute] Starting prefetch:", path)
            }

            // Prefetch bundle split JS alongside data, if defined
            foundRoute.route.onPreloadJS?.()
          },
          complete: () => {
            if (isDevelopment) {
              console.log("[usePrefetchRoute] Completed:", path)
            }

            onComplete?.()
          },
          error: () => {
            console.error("[usePrefetchRoute] Error prefetching:", path)
          },
        })

        return subscription
      })

      return querySubscriptions
    },
    [initialPath, prefetchDisabled],
  )

  return { prefetch }
}
