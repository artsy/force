import loadable from "@loadable/component"
import { ErrorPage } from "Components/ErrorPage"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const Order2App = loadable(
  () => import(/* webpackChunkName: "checkoutBundle" */ "./Order2App"),
  {
    resolveComponent: component => component.Order2App,
  },
)

const CheckoutRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "checkoutBundle" */ "./Routes/Checkout/Checkout"
    ),
  {
    resolveComponent: component => component.Checkout,
  },
)

const DetailsRoute = loadable(
  () =>
    import(/* webpackChunkName: "orderBundle" */ "./Routes/Details/Details"),
  {
    resolveComponent: component => component.DetailsFragmentContainer,
  },
)

export const order2Routes: RouteProps[] = [
  {
    path: "/orders2/:orderID",
    getComponent: () => Order2App,
    onPreloadJS: () => {
      Order2App.preload() // TODO: What should this do
    },
    children: [
      {
        path: "checkout",
        layout: "LogoOnly",
        Component: CheckoutRoute,
        shouldWarnBeforeLeaving: true,
        prepareVariables: params => ({ orderID: params.orderID }),
        // TODO: Should be `orderID: ID!`
        query: graphql`
          query order2Routes_CheckoutQuery($orderID: String!) {
            me {
              order(id: $orderID) {
                ...Checkout_order
              }
            }
          }
        `,
        render: args => {
          const { props, Component, match, resolving, data } = args
          if (!(Component && props)) {
            // Returning `null` will show the spinner; but undefined uses purple
            // loader. Its a weird quirk :/
            return undefined // null
          }
          const order = (props as any).me?.order
          // TODO: implement redirect logic based on order state and feature flags
          if (!order) {
            console.warn("No order found - checkout page")
            return <ErrorPage code={404} />
          }

          return <Component order={order} />
        },
      },
      {
        path: "details",
        Component: DetailsRoute,
        layout: "NavOnly",
        query: graphql`
          query order2Routes_DetailsQuery($orderID: String!) {
            me {
              order(id: $orderID) {
                ...Details_order
              }
            }
          }
        `,
        render: args => {
          const { props, Component, match, resolving, data } = args
          if (!(Component && props)) {
            // Returning `null` will show the spinner; but undefined uses purple
            // loader. Its a weird quirk :/
            return undefined // null
          }

          const order = (props as any).me?.order
          if (!order) {
            console.warn("No order found - details page")
            return <ErrorPage code={404} />
          }

          // TODO: implement redirect logic based on order state and feature flags

          return <Component order={order} />
        },
      },
    ],
  },
]
