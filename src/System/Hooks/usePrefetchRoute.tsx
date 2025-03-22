import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { isDevelopment } from "Utils/device"
import take from "lodash/take"
import { useCallback } from "react"
import { fetchQuery } from "react-relay"
import type {
  GraphQLTaggedNode,
  OperationType,
  Subscription,
} from "relay-runtime"

interface UsePrefetchRouteProps {
  initialPath?: string
  onComplete?: (response?: any) => void
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

        const subscription = fetchQueryData({
          query,
          variables,
          serverCacheTTL,
          onStart: () => {
            if (isDevelopment) {
              // console.log("[usePrefetchRoute] Starting prefetch:", path)
            }

            // Prefetch bundle split JS alongside data, if defined
            foundRoute.route.onPreloadJS?.()
          },
          onComplete: () => {
            if (isDevelopment) {
              // console.log("[usePrefetchRoute] Completed:", path)
            }

            onComplete?.()
          },
          onError: () => {
            // console.error("[usePrefetchRoute] Error prefetching:", path)
          },
        })

        // If there are prefetchSubQueries, fetch them as well
        if (prefetchSubQueries?.length) {
          prefetchSubQueries.forEach(
            ({ query, transformVariables, onStart, onComplete }) => {
              const subqueryVariables =
                transformVariables?.(variables) ?? variables

              console.log("subquery", subqueryVariables)

              fetchQueryData({
                query,
                variables: subqueryVariables,
                serverCacheTTL,
                onStart: () => {
                  if (isDevelopment) {
                    // console.log(
                    //   "[usePrefetchRoute] Starting prefetch [sub-query]:",
                    //   path,
                    // )
                  }

                  onStart?.(variables)
                },
                onComplete: response => {
                  if (isDevelopment) {
                    console.log(
                      "[usePrefetchRoute] Completed [sub-query]:",
                      path,
                    )
                  }
                  onComplete?.(response)
                },
                onError: () => {
                  console.error(
                    "[usePrefetchRoute] Error prefetching [sub-query]:",
                    path,
                  )
                },
              })
            },
          )
        }

        return subscription
      })

      return querySubscriptions
    },
    [initialPath, prefetchDisabled],
  )

  interface FetchQueryDataProps {
    query: GraphQLTaggedNode
    variables: OperationType["variables"]
    serverCacheTTL?: number
    onStart: () => void
    onComplete: (response: any) => void
    onError: () => void
  }

  const fetchQueryData = ({
    query,
    variables,
    serverCacheTTL,
    onStart,
    onComplete,
    onError,
  }: FetchQueryDataProps) => {
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
      next: response => {
        onComplete(response)
      },
      error: () => {
        onError()
      },
    })

    return subscription
  }

  return { prefetch }
}
