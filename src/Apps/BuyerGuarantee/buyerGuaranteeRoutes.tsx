import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

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

export const buyerGuaranteeRoutes: RouteProps[] = [
  {
    path: "/buyer-guarantee",
    getComponent: () => BuyerGuaranteeApp,
    onClientSideRender: () => {
      BuyerGuaranteeApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => BuyerGuaranteeIndexRoute,
        onClientSideRender: () => {
          return BuyerGuaranteeIndexRoute.preload()
        },
      },
    ],
  },
]
