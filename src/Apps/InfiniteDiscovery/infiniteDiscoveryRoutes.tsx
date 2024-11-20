import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const InfiniteDiscoveryApp = loadable(
  () =>
    import(/* webpackChunkName: "discoveryBundle" */ "./InfiniteDiscoveryApp"),
  {
    resolveComponent: component => component.InfiniteDiscoveryApp,
  }
)

export const infiniteDiscoveryRoutes: RouteProps[] = [
  {
    path: "/infinite-discovery",
    getComponent: () => InfiniteDiscoveryApp,
    onClientSideRender: () => {
      InfiniteDiscoveryApp.preload()
    },
  },
]
