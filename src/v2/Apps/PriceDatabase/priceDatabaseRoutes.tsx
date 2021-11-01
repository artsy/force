import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { PriceDatabase } from "./PriceDatabase"

const PriceDatabaseApp = loadable(
  () => import(/* webpackChunkName: "priceDatabaseBundle" */ "./PriceDatabase"),
  {
    resolveComponent: component => component.PriceDatabase,
  }
)

export const priceDatabaseRoutes: AppRouteConfig[] = [
  {
    path: "/price-database",
    getComponent: () => PriceDatabase,
    onClientSideRender: () => {
      PriceDatabaseApp.preload()
    },
  },
]
