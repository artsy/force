import loadable from "@loadable/component"
import { getRedirect } from "Apps/Order/getRedirect"
import { redirects } from "Apps/Order/redirects"
import { ErrorPage } from "Components/ErrorPage"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import { HttpError, Redirect, RedirectException } from "found"
import { graphql } from "react-relay"
import { Provider } from "unstated"

const NOT_FOUND_ERROR = "Please check the URL or verify your account details."

const renderWithErrorHandling = ({
  Component,
  props,
  error,
  resolving,
}: any) => {
  const isServer = typeof window === "undefined"

  if (error && error.status !== 404) throw error

  const is404 = error?.status === 404

  const isLoading = !props

  console.log("renderWithErrorHandling vars:", {
    Component: !!Component,
    props: !!props,
    error,
    is404,
    isLoading,
    isServer,
    resolving,
  })

  if (isServer && (is404 || (isLoading && !resolving))) {
    console.log("renderWithErrorHandling: throwing 404 (server-side)")
    throw new HttpError(404, NOT_FOUND_ERROR)
  }

  if (is404) {
    console.log("renderWithErrorHandling: rendering 404 (client-side)")
    return (
      <Provider>
        <ErrorPage code={404} message={NOT_FOUND_ERROR} />
      </Provider>
    )
  }

  if (isLoading) return undefined

  return <Component {...props} />
}

const RespondRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Respond"),
  {
    resolveComponent: component => component.RespondFragmentContainer,
  },
)

const OfferRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Offer"),
  {
    resolveComponent: component => component.OfferFragmentContainer,
  },
)

const ShippingRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Shipping"),
  {
    resolveComponent: component => component.ShippingRouteWithDialog,
  },
)

const PaymentRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Payment"),
  {
    resolveComponent: component => component.PaymentFragmentContainer,
  },
)

const NewPaymentRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/NewPayment"),
  {
    resolveComponent: component => component.NewPaymentFragmentContainer,
  },
)

const CounterRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Counter"),
  {
    resolveComponent: component => component.CounterFragmentContainer,
  },
)

const ReviewRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Review"),
  {
    resolveComponent: component => component.ReviewFragmentContainer,
  },
)

const AcceptRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Accept"),
  {
    resolveComponent: component => component.AcceptFragmentContainer,
  },
)

const DeclineRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Reject"),
  {
    resolveComponent: component => component.RejectFragmentContainer,
  },
)

const StatusRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Status"),
  {
    resolveComponent: component => component.StatusFragmentContainer,
  },
)

const DetailsRoute = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./Routes/Details"),
  {
    resolveComponent: component => component.OrderDetailsRoute,
  },
)

const OrderApp = loadable(
  () => import(/* webpackChunkName: "orderBundle" */ "./OrderApp"),
  {
    resolveComponent: component => component.OrderAppFragmentContainer,
  },
)

// FIXME:
// * `render` functions requires casting
export const orderRoutes: RouteProps[] = [
  {
    path: "/order(s)/:orderID",
    layout: "LogoOnly",
    Component: OrderApp,
    onPreloadJS: () => {
      OrderApp.preload()
      OfferRoute.preload()
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
          ...OrderApp_order
        }
      }
    `,
    render: ({ Component, props, resolving, error }: any) => {
      console.log("OrderApp (Parent) render vars:", {
        Component: !!Component,
        props: !!props,
        resolving,
        error,
        isServer: typeof window === "undefined",
      })

      if (error) {
        // If it's a 404 with undefined data, replace with our standard message
        if (error.status === 404 && !error.data) {
          throw new HttpError(404, NOT_FOUND_ERROR)
        }
        throw error
      }

      if (!(Component && props)) {
        // Returning `null` will show the spinner; but undefined uses purple
        // loader. Its a weird quirk :/
        return undefined // null
      }

      // resolving is true only if this render results from a query initiated by
      // found-relay
      if (resolving) {
        const { match, order } = props as any
        const { featureFlags } = match.context as SystemContextProps

        if (order) {
          const redirect = getRedirect(
            redirects,
            match.location.pathname.replace(/order(s)\/[^\/]+/, ""),
            { order, featureFlags },
          )

          if (redirect === null) {
            // Work around to ensure that all of the "stays on the..." tests
            // remain valid for Relay 13 upgrade, since with the new approach
            // the resolver never resolves the data to return the undefined
            // redirect.
            if (process.env.NODE_ENV === "test") {
              throw new Error("No redirect found for order")
            }
          }
          if (redirect !== null) {
            if (process.env.NODE_ENV === "development") {
              console.error(
                `Redirecting from ${match.location.pathname} to ${redirect.path} because '${redirect.reason}'`,
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
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_RespondQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Respond_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "offer",
        Component: OfferRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_OfferQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Offer_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "shipping",
        Component: ShippingRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_ShippingQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
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
        render: renderWithErrorHandling,
      },
      {
        path: "payment",
        Component: PaymentRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_PaymentQuery($orderID: ID!) {
            me {
              ...Payment_me
            }
            order: commerceOrder(id: $orderID) @principalField {
              ...Payment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "payment/new",
        Component: NewPaymentRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_NewPaymentQuery($orderID: ID!) {
            me {
              ...NewPayment_me
            }
            order: commerceOrder(id: $orderID) @principalField {
              ...NewPayment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "review/counter",
        Component: CounterRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_CounterQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Counter_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "review",
        Component: ReviewRoute,
        shouldWarnBeforeLeaving: true,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_ReviewQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Review_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "review/accept",
        Component: AcceptRoute,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_AcceptQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Accept_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "review/decline",
        Component: DeclineRoute,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_RejectQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Reject_order
            }
          }
        `,
        render: renderWithErrorHandling,
      },
      {
        path: "status",
        Component: StatusRoute,
        layout: "LogoOnly",
        query: graphql`
          query orderRoutes_StatusQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) @principalField {
              ...Status_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },
      {
        path: "details",
        Component: DetailsRoute,
        layout: "OrderDetails",
        query: graphql`
          query orderRoutes_DetailsQuery($orderID: ID!) {
            viewer {
              ...OrderDetailsRoute_viewer @arguments(orderID: $orderID)
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
        render: renderWithErrorHandling,
      },

      new Redirect({
        // For now, redirect the empty route to the shipping page
        from: "/",
        to: "/orders/:orderID/shipping",
      }) as any,
      {
        path: "*",
        Component: () => {
          console.log("Wildcard route: rendering 404")
          return (
            <Provider>
              <ErrorPage code={404} message={NOT_FOUND_ERROR} />
            </Provider>
          )
        },
      },
    ],
  },
]
