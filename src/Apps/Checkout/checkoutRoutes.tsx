import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

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
        Component: ApplePayRoute,
        prepareVariables: params => ({ orderID: params.orderID }),
        query: graphql`
          query checkoutRoutes_ApplePayQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...ApplePay_order
            }
          }
        `,
      },
    ],
  },
]
