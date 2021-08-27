import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const BuyerGuaranteeApp = loadable(
  () => import(/* webpackChunkName: "buyerBundle" */ "./BuyerGuaranteeApp"),
  {
    resolveComponent: component => component.BuyerGuaranteeApp,
  }
)

const BuyerGuaranteeIndexRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "buyerBundle" */ "./Routes/BuyerGuaranteeIndex"
    ),
  {
    resolveComponent: component => component.BuyerGuaranteeIndex,
  }
)

export const buyerGuaranteeRoutes: AppRouteConfig[] = [
  {
    path: "/buyer-guarantee",
    theme: "v3",
    getComponent: () => BuyerGuaranteeApp,
    prepare: () => {
      BuyerGuaranteeApp.preload()
    },
    children: [
      {
        path: "",
        theme: "v3",
        getComponent: () => BuyerGuaranteeIndexRoute,
        prepare: () => {
          return BuyerGuaranteeIndexRoute.preload()
        },
      },
    ],
  },
]
