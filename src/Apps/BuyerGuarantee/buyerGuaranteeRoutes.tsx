import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const BuyerGuaranteeApp = loadable(
  () => import(/* webpackChunkName: "buyerBundle" */ "./BuyerGuaranteeApp"),
  {
    resolveComponent: component => component.BuyerGuaranteeApp,
  },
)

const BuyerGuaranteeIndexRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "buyerBundle" */ "./Routes/BuyerGuaranteeIndex"
    ),
  {
    resolveComponent: component => component.BuyerGuaranteeIndex,
  },
)

export const buyerGuaranteeRoutes: RouteProps[] = [
  {
    path: "/buyer-guarantee",
    getComponent: () => BuyerGuaranteeApp,
    onPreloadJS: () => {
      BuyerGuaranteeApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => BuyerGuaranteeIndexRoute,
        onPreloadJS: () => {
          return BuyerGuaranteeIndexRoute.preload()
        },
      },
    ],
  },
]
