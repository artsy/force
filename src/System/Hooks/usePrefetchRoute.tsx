import { RouteProps } from "found"
import { MatchResult } from "path-to-regexp"
import { fetchQuery } from "react-relay"
import { OperationType, Subscription } from "relay-runtime"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

interface UsePrefetchRouteProps {
  path: string
}

export interface RouteMatch {
  route: RouteProps
  match: MatchResult<any>
}

export const usePrefetchRoute = (
  props: UsePrefetchRouteProps
): { prefetch: () => Array<Subscription | null> } => {
  const { relayEnvironment } = useSystemContext()

  const { match } = useRouter()

  const prefetch = () => {
    const routes = findRoutesByPath({ path: props.path })

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
      }).subscribe({
        start: () => {
          console.log("[usePrefetchRoute] Starting prefetch:", props.path)
        },
        complete: () => {
          console.log("[usePrefetchRoute] Completed:", props.path)
        },
        error: () => {
          console.error(
            "[usePrefetchRoute] Error prefetching:",
            foundRoute.route.path
          )
        },
      })

      return subscription
    })

    return querySubscriptions
  }

  return { prefetch }
}
