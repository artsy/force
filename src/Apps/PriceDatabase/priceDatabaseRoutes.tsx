import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const PriceDatabaseApp = loadable(
  () => import(/* webpackChunkName: "priceDatabaseBundle" */ "./PriceDatabase"),
  { resolveComponent: component => component.PriceDatabase }
)

export const priceDatabaseRoutes: RouteProps[] = [
  {
    path: "/price-database",
    getComponent: () => PriceDatabaseApp,
    onPreloadJS: () => {
      PriceDatabaseApp.preload()
    },
  },
]
