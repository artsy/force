import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const Order3App = loadable(
  () => import(/* webpackChunkName: "order3Bundle" */ "./Order3App"),
  {
    resolveComponent: component => component.Order3AppFragmentContainer,
  },
)

const OrderConfirmationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "order3Bundle" */ "./Routes/OrderConfirmation/OrderConfirmationRoute"
    ),
  {
    resolveComponent: component => component.OrderConfirmationRoute,
  },
)

export const order3Routes: RouteProps[] = [
  {
    path: "/order3",
    getComponent: () => Order3App,
    onPreloadJS: () => {
      Order3App.preload()
    },
    query: graphql`
      query order3Routes_Order3Query {
        system {
          ...Order3App_system
        }
      }
    `,
    children: [
      {
        path: "",
        Component: OrderConfirmationRoute,
      },
    ],
  },
]
