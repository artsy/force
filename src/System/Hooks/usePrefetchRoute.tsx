import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { isDevelopment } from "Utils/device"
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

  const prefetchFeatureFlagEnabled = useFeatureFlag("diamond_prefetch-hover")
  const prefetchSubqueriesFeatureFlagEnabled = useFeatureFlag(
    "diamond_prefetch-subqueries",
  )

  // If we're transitioning routes, we don't want to prefetch
  const prefetchDisabled = !prefetchFeatureFlagEnabled || !match?.elements

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
          route: { query, prefetchSubQueries, prepareVariables },
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

        // Prefetch primary route query
        const subscription = fetchQueryData({
          query,
          variables,
          serverCacheTTL,
          onStart: () => {
            if (isDevelopment) {
              console.log(
                "[usePrefetchRoute] Starting prefetch [primary-query]:",
                path,
              )
            }

            // Prefetch bundle split JS alongside data, if defined
            foundRoute.route.onPreloadJS?.()
          },
          onComplete: () => {
            if (isDevelopment) {
              console.log("[usePrefetchRoute] Completed [primary-query]:", path)
            }

            onComplete?.()
          },
          onError: () => {
            console.error(
              "[usePrefetchRoute] Error prefetching [primary-query]:",
              path,
            )
          },
        })

        // If there are prefetchSubQueries, fetch them as well
        if (
          prefetchSubqueriesFeatureFlagEnabled &&
          prefetchSubQueries?.length
        ) {
          prefetchSubQueries.forEach(prefetchQuery => {
            fetchQueryData({
              query: prefetchQuery,
              variables,
              serverCacheTTL,
              onStart: () => {
                if (isDevelopment) {
                  console.log(
                    "[usePrefetchRoute] Starting prefetch [sub-query]:",
                    path,
                  )
                }
              },
              onComplete: () => {
                if (isDevelopment) {
                  console.log("[usePrefetchRoute] Completed [sub-query]:", path)
                }
              },
              onError: () => {
                console.error(
                  "[usePrefetchRoute] Error prefetching [sub-query]:",
                  path,
                )
              },
            })
          })
        }

        return subscription
      })

      return querySubscriptions
    },
    [initialPath, prefetchDisabled],
  )

  const fetchQueryData = ({
    query,
    variables,
    serverCacheTTL,
    onStart,
    onComplete,
    onError,
  }) => {
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
        onStart()
      },
      complete: () => {
        onComplete()
      },
      error: () => {
        onError()
      },
    })

    return subscription
  }

  return { prefetch }
}
