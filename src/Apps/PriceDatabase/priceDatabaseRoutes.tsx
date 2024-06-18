import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
import { PriceDatabase } from "./PriceDatabase"

const PriceDatabaseApp = loadable(
  () => import(/* webpackChunkName: "priceDatabaseBundle" */ "./PriceDatabase"),
  {
    resolveComponent: component => component.PriceDatabase,
  }
)

export const priceDatabaseRoutes: RouteProps[] = [
  {
    path: "/price-database",
    getComponent: () => PriceDatabase,
    onClientSideRender: () => {
      PriceDatabaseApp.preload()
    },
  },
]
