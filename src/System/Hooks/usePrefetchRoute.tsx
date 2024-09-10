import take from "lodash/take"
import { useCallback } from "react"
import { fetchQuery } from "react-relay"
import { OperationType, Subscription } from "relay-runtime"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { isDevelopment } from "Utils/device"

export const usePrefetchRoute = (
  initialPath?: string
): { prefetch: (path?: string) => Array<Subscription | null> | null } => {
  const { relayEnvironment } = useSystemContext()

  const { match } = useRouter()

  // If we're transitioning routes, we don't want to prefetch
  const prefetchDisabled = !match?.elements

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

        const subscription = fetchQuery(relayEnvironment, query, variables, {
          fetchPolicy: "store-or-network",
          networkCacheConfig: {
            force: false,
          },
        }).subscribe({
          start: () => {
            if (isDevelopment) {
              console.log("[usePrefetchRoute] Starting prefetch:", path)
            }
          },
          complete: () => {
            if (isDevelopment) {
              console.log("[usePrefetchRoute] Completed:", path)
            }
          },
          error: () => {
            console.error("[usePrefetchRoute] Error prefetching:", path)
          },
        })

        return subscription
      })

      return querySubscriptions
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialPath, prefetchDisabled]
  )

  return { prefetch }
}
