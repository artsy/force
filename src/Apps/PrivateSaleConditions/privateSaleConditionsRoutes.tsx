import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { PrivateSaleConditions } from "./PrivateSaleConditions"

const PrivateSaleConditionsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "privateSaleConditionsBundle" */ "./PrivateSaleConditions"
    ),
  {
    resolveComponent: component => component.PrivateSaleConditions,
  }
)

export const privateSaleConditionsRoutes: AppRouteConfig[] = [
  {
    path: "/private-sale-conditions",
    getComponent: () => PrivateSaleConditions,
    onClientSideRender: () => {
      PrivateSaleConditionsApp.preload()
    },
  },
]
