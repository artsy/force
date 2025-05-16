import loadable from "@loadable/component"
import { newCheckoutEnabled, newDetailsEnabled } from "Apps/Order/redirects"
import { ErrorPage } from "Components/ErrorPage"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import createLogger from "Utils/logger"
import type { order2Routes_CheckoutQuery$data } from "__generated__/order2Routes_CheckoutQuery.graphql"
import type { order2Routes_DetailsQuery$data } from "__generated__/order2Routes_DetailsQuery.graphql"
import { type Match, RedirectException } from "found"
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
        layout: "LogoOnlyFullBleed",
        Component: CheckoutRoute,
        shouldWarnBeforeLeaving: true,
        prepareVariables: params => ({ orderID: params.orderID }),
        query: graphql`
          query order2Routes_CheckoutQuery($orderID: ID!) {
            viewer {
              me {
                order(id: $orderID) {
                  internalID
                  mode
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
          const typedProps = props as unknown as {
            viewer: order2Routes_CheckoutQuery$data["viewer"]
            match: Match<SystemContextProps>
          }
          const { viewer, match } = typedProps
          const order = viewer?.me?.order
          const featureFlags = match.context.featureFlags

          if (!order) {
            logger.warn("No order found - checkout page")
            return <ErrorPage code={404} />
          }

          if (!newCheckoutEnabled({ order, featureFlags })) {
            const redirectUrl = `/orders/${order.internalID}/shipping`
            if (process.env.NODE_ENV === "development") {
              console.error(
                `Redirecting from to ${redirectUrl} because Order2 checkout is not enabled for this order`,
              )
            }
            throw new RedirectException(redirectUrl)
          }

          return <Component viewer={viewer} />
        },
      },
      {
        path: "details",
        Component: DetailsRoute,
        layout: "FullBleed",
        query: graphql`
          query order2Routes_DetailsQuery($orderID: ID!) {
            viewer {
              ...Order2DetailsRoute_viewer @arguments(orderID: $orderID)
              me {
                order(id: $orderID) {
                  internalID
                  mode
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
          const typedProps = props as unknown as {
            viewer: order2Routes_DetailsQuery$data["viewer"]
            match: Match<SystemContextProps>
          }
          const { viewer, match } = typedProps
          const order = viewer?.me?.order
          const featureFlags = match.context.featureFlags

          if (!order) {
            logger.warn("No order found - details page")
            return <ErrorPage code={404} />
          }

          if (!newDetailsEnabled({ order, featureFlags })) {
            const redirectUrl = `/orders/${order.internalID}/status`
            if (process.env.NODE_ENV === "development") {
              console.error(
                `Redirecting from to ${redirectUrl} because Order2 details page is not enabled for this order`,
              )
            }
            throw new RedirectException(redirectUrl)
          }

          return <Component viewer={viewer} />
        },
      },
    ],
  },
]
