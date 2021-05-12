import loadable from "@loadable/component"
import { getRedirect } from "v2/Apps/Order/getRedirect"
import { redirects } from "v2/Apps/Order/redirects"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Redirect, RedirectException } from "found"
import React from "react"
import { graphql } from "react-relay"

import { RespondFragmentContainer as RespondRoute } from "./Routes/Respond"
import { OfferFragmentContainer as OfferRoute } from "./Routes/Offer"
import { ShippingFragmentContainer as ShippingRoute } from "./Routes/Shipping"
import { PaymentFragmentContainer as PaymentRoute } from "./Routes/Payment"
import { NewPaymentFragmentContainer as NewPaymentRoute } from "./Routes/NewPayment"
import { CounterFragmentContainer as CounterRoute } from "./Routes/Counter"
import { ReviewFragmentContainer as ReviewRoute } from "./Routes/Review"
import { AcceptFragmentContainer as AcceptRoute } from "./Routes/Accept"
import { RejectFragmentContainer as DeclineRoute } from "./Routes/Reject"
import { StatusFragmentContainer as StatusRoute } from "./Routes/Status"
import { AppRouteConfig } from "v2/Artsy/Router/Route"

const OrderApp = loadable(() => import("./OrderApp"), {
  resolveComponent: component => component.OrderApp,
})

// FIXME:
// * `render` functions requires casting
export const orderRoutes: AppRouteConfig[] = [
  {
    // TODO: Still need order2?
    path: "/order(2|s)/:orderID",
    hideFooter: true,
    Component: OrderApp,
    prepare: () => {
      OrderApp.preload()
    },

    // TODO: Better support `@principalField` in Metaphysics.
    // This currently only works because of the `order` field alias.
    query: graphql`
      query orderRoutes_OrderQuery($orderID: ID!) @raw_response_type {
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
        Component: RespondRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_RespondQuery($orderID: ID!) {
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
        Component: OfferRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_OfferQuery($orderID: ID!) {
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
        Component: ShippingRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_ShippingQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Shipping_order
            }
            me {
              ...Shipping_me
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "payment",
        Component: PaymentRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_PaymentQuery($orderID: ID!) {
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
        Component: NewPaymentRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_NewPaymentQuery($orderID: ID!) {
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
        Component: CounterRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_CounterQuery($orderID: ID!) {
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
        Component: ReviewRoute,
        shouldWarnBeforeLeaving: true,
        hideFooter: true,
        query: graphql`
          query orderRoutes_ReviewQuery($orderID: ID!) {
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
        Component: AcceptRoute,
        hideFooter: true,
        query: graphql`
          query orderRoutes_AcceptQuery($orderID: ID!) {
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
        Component: DeclineRoute,
        hideFooter: true,
        query: graphql`
          query orderRoutes_RejectQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Reject_order
            }
          }
        `,
      },
      {
        path: "status",
        Component: StatusRoute,
        hideFooter: true,
        query: graphql`
          query orderRoutes_StatusQuery($orderID: ID!) {
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
          // @ts-expect-error STRICT_NULL_CHECK
          return <ErrorPage code={404} />
        },
      },
    ],
  },
]
