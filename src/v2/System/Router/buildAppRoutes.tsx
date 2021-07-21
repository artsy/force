import { Match, Router, withRouter } from "found"
import { flatten } from "lodash"
import React, { useEffect } from "react"

import { AppShell } from "v2/Apps/Components/AppShell"
import { useSystemContext } from "v2/System/SystemContext"
import { interceptLinks } from "./interceptLinks"
import { AppRouteConfig } from "./Route"

interface RouteList {
  routes: AppRouteConfig[]

  /**
   * Disabled routes are not mounted within global route
   */
  disabled?: boolean
}

export function buildAppRoutes(routeList: RouteList[]): AppRouteConfig[] {
  const routes = getActiveRoutes(routeList)

  const Component: React.FC<{
    children: React.ReactNode
    match: Match
    router: Router
  }> = props => {
    const { router, setRouter } = useSystemContext()

    // Store global reference to router instance
    useEffect(() => {
      if (props.router !== router) {
        // @ts-expect-error STRICT_NULL_CHECK
        setRouter(props.router)
      }

      interceptLinks({
        router: props.router,
        routes,
      })
    }, [props.router, router, setRouter])

    return <AppShell {...props} />
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      Component: withRouter(Component),
      children: routes,
      path: "",
    },
  ]
}

function getActiveRoutes(routeList) {
  const routes = flatten(
    routeList.reduce((acc, route: RouteList) => {
      if (route.disabled) {
        return acc
      } else {
        return acc.concat(route.routes)
      }
    }, [])
  ).map(createRouteConfiguration)
  return routes
}

function createRouteConfiguration(route): AppRouteConfig {
  return {
    ...route,
    fetchIndicator: "overlay",
  }
}
