import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const DiscoverDailyApp = loadable(
  () => import(/* webpackChunkName: "discoveryBundle" */ "./DiscoverDailyApp"),
  {
    resolveComponent: component => component.DiscoverDailyApp,
  },
)

export const discoverDailyRoutes: RouteProps[] = [
  {
    path: "/discover-daily",
    cacheConfig: {
      force: true,
    },
    serverCacheTTL: 0,
    getComponent: () => DiscoverDailyApp,
    onClientSideRender: () => {
      DiscoverDailyApp.preload()
    },
  },
]
