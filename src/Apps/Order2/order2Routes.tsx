import loadable from "@loadable/component"
import { ErrorPage } from "Components/ErrorPage"
import type { RouteProps } from "System/Router/Route"
import createLogger from "Utils/logger"
import type { order2Routes_CheckoutQuery$data } from "__generated__/order2Routes_CheckoutQuery.graphql"
import type { order2Routes_DetailsQuery$data } from "__generated__/order2Routes_DetailsQuery.graphql"
import { graphql } from "react-relay"

const logger = createLogger("order2Routes.tsx")

const Order2App = loadable(
  () => import(/* webpackChunkName: "checkoutBundle" */ "./Order2App"),
  {
    resolveComponent: component => component.Order2App,
  },
)

const CheckoutRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "checkoutBundle" */ "./Routes/Checkout/Order2CheckoutRoute"
    ),
  {
    resolveComponent: component => component.Order2CheckoutRoute,
  },
)

const DetailsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "orderBundle" */ "./Routes/Details/Order2DetailsRoute"
    ),
  {
    resolveComponent: component => component.Order2DetailsRoute,
  },
)

export const order2Routes: RouteProps[] = [
  {
    path: "/orders2/:orderID",
    getComponent: () => Order2App,
    onPreloadJS: () => {
      Order2App.preload()
    },
    children: [
      {
        path: "checkout",
        layout: "LogoOnly",
        Component: CheckoutRoute,
        shouldWarnBeforeLeaving: true,
        prepareVariables: params => ({ orderID: params.orderID }),
        query: graphql`
          query order2Routes_CheckoutQuery($orderID: String!) {
            viewer {
              me {
                order(id: $orderID) {
                  internalID
                }
              }
              ...Order2CheckoutRoute_viewer @arguments(orderID: $orderID)
            }
          }
        `,
        render: args => {
          const { props, Component } = args
          if (!(Component && props)) {
            return
          }
          const viewer = (props as unknown as order2Routes_CheckoutQuery$data)
            .viewer
          const order = viewer?.me?.order
          if (!order) {
            logger.warn("No order found - checkout page")
            return <ErrorPage code={404} />
          }

          return <Component viewer={viewer} />
        },
      },
      {
        path: "details",
        Component: DetailsRoute,
        layout: "NavOnly",
        query: graphql`
          query order2Routes_DetailsQuery($orderID: String!) {
            viewer {
              ...Order2DetailsRoute_viewer @arguments(orderID: $orderID)
              me {
                order(id: $orderID) {
                  internalID
                }
              }
            }
          }
        `,
        render: args => {
          const { props, Component } = args
          if (!(Component && props)) {
            return
          }
          const viewer = (props as unknown as order2Routes_DetailsQuery$data)
            .viewer

          const order = viewer?.me?.order
          if (!order) {
            logger.warn("No order found - details page")
            return <ErrorPage code={404} />
          }

          return <Component viewer={viewer} />
        },
      },
    ],
  },
]
