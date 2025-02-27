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
      /* webpackChunkName: "exampleBundle" */ "./Routes/Welcome/CheckoutOverviewRoute"
    ),
  {
    resolveComponent: component => component.CheckoutOverviewRoute,
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
    ],
  },
]
