import loadable from "@loadable/component"
import { getRedirect } from "v2/Apps/Order/getRedirect"
import { redirects } from "v2/Apps/Order/redirects"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Redirect, RedirectException, RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"

const OrderApp = loadable(() => import("./OrderApp"))
const RespondRoute = loadable(() => import("./Routes/Respond"))
const OfferRoute = loadable(() => import("./Routes/Offer"))
const ShippingRoute = loadable(() => import("./Routes/Shipping"))
const PaymentRoute = loadable(() => import("./Routes/Payment"))
const NewPaymentRoute = loadable(() => import("./Routes/NewPayment"))
const CounterRoute = loadable(() => import("./Routes/Counter"))
const ReviewRoute = loadable(() => import("./Routes/Review"))
const AcceptRoute = loadable(() => import("./Routes/Accept"))
const DeclineRoute = loadable(() => import("./Routes/Reject"))
const StatusRoute = loadable(() => import("./Routes/Status"))

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/order(2|s)/:orderID",
    Component: OrderApp,
    prepare: () => {
      OrderApp.preload()
    },

    // TODO: Better support `@principalField` in Metaphysics.
    // This currently only works because of the `order` field alias.
    query: graphql`
      query routes_OrderQuery($orderID: ID!) @raw_response_type {
        me {
          name
        }
        order: commerceOrder(id: $orderID) @principalField {
          ...redirects_order @relay(mask: false)
          ...OrderApp_order @relay(mask: false)
        }
      }
    `,
    render: ({ Component, props, resolving }) => {
      if (!(Component && props)) {
        // Returning `null` will show the spinner; but undefined uses purple
        // loader. Its a weird quirk :/
        return undefined // null
      }
      // resolving is true only if this render results from a query initiated by
      // found-relay
      if (resolving) {
        const { match, order } = props as any

        if (order) {
          const redirect = getRedirect(
            redirects,
            match.location.pathname.replace(/order(2|s)\/[^\/]+/, ""),
            { order }
          )
          if (redirect !== null) {
            if (process.env.NODE_ENV === "development") {
              console.error(
                `Redirecting from ${match.location.pathname} to ${redirect.path} because '${redirect.reason}'`
              )
            }
            throw new RedirectException(redirect.path)
          }
        }
      }

      return <Component {...props} />
    },
    children: [
      {
        path: "respond",
        getComponent: () => RespondRoute,
        prepare: () => {
          RespondRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_RespondQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Respond_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "offer",
        getComponent: () => OfferRoute,
        prepare: () => {
          OfferRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_OfferQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Offer_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "shipping",
        getComponent: () => ShippingRoute,
        prepare: () => {
          ShippingRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_ShippingQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Shipping_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "payment",
        getComponent: () => PaymentRoute,
        prepare: () => {
          PaymentRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_PaymentQuery($orderID: ID!) {
            me {
              ...Payment_me
            }
            order: commerceOrder(id: $orderID) {
              ...Payment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "payment/new",
        getComponent: () => NewPaymentRoute,
        prepare: () => {
          NewPaymentRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_NewPaymentQuery($orderID: ID!) {
            me {
              ...NewPayment_me
            }
            order: commerceOrder(id: $orderID) {
              ...NewPayment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/counter",
        getComponent: () => CounterRoute,
        prepare: () => {
          CounterRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_CounterQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Counter_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review",
        getComponent: () => ReviewRoute,
        prepare: () => {
          ReviewRoute.preload()
        },
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_ReviewQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Review_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/accept",
        getComponent: () => AcceptRoute,
        prepare: () => {
          AcceptRoute.preload()
        },
        query: graphql`
          query routes_AcceptQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Accept_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/decline",
        getComponent: () => DeclineRoute,
        prepare: () => {
          DeclineRoute.preload()
        },
        query: graphql`
          query routes_RejectQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Reject_order
            }
          }
        `,
      },
      {
        path: "status",
        getComponent: () => StatusRoute,
        prepare: () => {
          StatusRoute.preload()
        },
        query: graphql`
          query routes_StatusQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Status_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      new Redirect({
        // For now, redirect the empty route to the shipping page
        from: "/",
        to: "/orders/:orderID/shipping",
      }) as any,
      {
        path: "*",
        Component: props => {
          return <ErrorPage code={404} />
        },
      },
    ],
  },
]
