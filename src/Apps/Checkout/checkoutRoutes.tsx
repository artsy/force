import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const CheckoutApp = loadable(
  () => import(/* webpackChunkName: "checkoutBundle" */ "./CheckoutApp"),
  {
    resolveComponent: component => component.CheckoutApp,
  },
)

const CheckoutOverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "checkoutBundle" */ "./Routes/CheckoutOverviewRoute"
    ),
  {
    resolveComponent: component => component.CheckoutOverviewRoute,
  },
)

const ApplePayRoute = loadable(
  () => import(/* webpackChunkName: "checkoutBundle" */ "./ApplePay"),
  {
    resolveComponent: component => component.ApplePay,
  },
)

export const checkoutRoutes: RouteProps[] = [
  {
    path: "/checkout",
    getComponent: () => CheckoutApp,
    onPreloadJS: () => {
      CheckoutApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => CheckoutOverviewRoute,
      },
      {
        path: ":orderID",
        getComponent: () => ApplePayRoute,
      },
    ],
  },
]
