import loadable from "@loadable/component"
import { getRedirect } from "Apps/Order/getRedirect"
import { order2Redirects } from "Apps/Order2/redirects"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import { NOT_FOUND_ERROR } from "Apps/Order2/constants"
import { HttpError, RedirectException } from "found"
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
      /* webpackChunkName: "checkoutBundle" */ "./Routes/Checkout/Order2CheckoutRoute"
    ),
  {
    resolveComponent: component => component.Order2CheckoutRoute,
  },
)

export const order2Routes: RouteProps[] = [
  {
    path: "/orders2/:orderID",
    Component: Order2App,
    onPreloadJS: () => {
      Order2App.preload()
    },

    query: graphql`
      query order2Routes_OrderQuery($orderID: ID!) @raw_response_type {
        me {
          order(id: $orderID) {
            ...redirects_order2 @relay(mask: false)
          }
        }
      }
    `,
    render: ({ Component, props, resolving, error }: any) => {
      if (error) {
        if (error.status === 404 && !error.data) {
          throw new HttpError(404, NOT_FOUND_ERROR)
        }
        throw error
      }

      if (!(Component && props)) {
        return undefined
      }

      const order = props.me?.order

      if (!order) {
        return <OrderErrorApp code={404} message={NOT_FOUND_ERROR} />
      }

      if (resolving) {
        const { match } = props as any
        const { featureFlags } = match.context as SystemContextProps

        const redirect = getRedirect(
          order2Redirects,
          match.location.pathname.replace(/orders2\/[^\/]+/, ""),
          { order, featureFlags },
        )

        if (redirect !== null) {
          if (process.env.NODE_ENV === "development") {
            console.error(
              `Redirecting from ${match.location.pathname} to ${redirect.path} because '${redirect.reason}'`,
            )
          }
          throw new RedirectException(redirect.path)
        }
      }

      return <Component {...props} />
    },
    children: [
      {
        path: "checkout",
        layout: "Checkout",
        Component: CheckoutRoute,
        shouldWarnBeforeLeaving: true,
        prepareVariables: params => ({ orderID: params.orderID }),
        query: graphql`
          query order2Routes_CheckoutQuery($orderID: ID!) {
            viewer {
              ...Order2CheckoutRoute_viewer @arguments(orderID: $orderID)
            }
          }
        `,
        render: ({ Component, props }: any) => {
          if (!(Component && props)) {
            return
          }
          return <Component viewer={props.viewer} />
        },
      },
      {
        path: "offer",
        layout: "Checkout",
        Component: CheckoutRoute,
        shouldWarnBeforeLeaving: true,
        prepareVariables: params => ({ orderID: params.orderID }),
        query: graphql`
          query order2Routes_OfferQuery($orderID: ID!) {
            viewer {
              ...Order2CheckoutRoute_viewer @arguments(orderID: $orderID)
            }
          }
        `,
        render: ({ Component, props }: any) => {
          if (!(Component && props)) {
            return
          }
          return <Component viewer={props.viewer} />
        },
      },
    ],
  },
]
