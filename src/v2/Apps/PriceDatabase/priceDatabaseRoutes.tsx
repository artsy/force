import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const MarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "priceDatabaseBundle" */ "./Routes/MarketingLanding/MarketingLandingApp"
    ),
  {
    resolveComponent: component => component.MarketingLandingApp,
  }
)

export const priceDatabaseRoutes: AppRouteConfig[] = [
  {
    path: "/price-database",
    theme: "v3",
    getComponent: () => MarketingLandingApp,
    prepare: () => {
      MarketingLandingApp.preload()
    },
  },
]
