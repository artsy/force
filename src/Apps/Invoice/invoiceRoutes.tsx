import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const InvoiceApp = loadable(
  () => import(/* webpackChunkName: "invoiceBundle" */ "./InvoiceApp"),
  {
    resolveComponent: component => component.InvoiceApp,
  },
)

const InvoiceDetailRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "invoiceBundle" */ "./Routes/InvoiceDetailRoute"
    ),
  {
    resolveComponent: component => component.InvoiceDetailRoute,
  },
)

const InvoicePaymentRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "invoiceBundle" */ "./Routes/InvoicePaymentRoute"
    ),
  {
    resolveComponent: component => component.InvoicePaymentRoute,
  },
)

export const invoiceRoutes: RouteProps[] = [
  {
    path: "/invoice/:token",
    layout: "LogoOnly",
    getComponent: () => InvoiceApp,
    onPreloadJS: () => {
      InvoiceApp.preload()
    },
    query: graphql`
      query invoiceRoutes_InvoiceQuery($token: String!) {
        invoice(token: $token) {
          ...InvoiceApp_invoice
        }
      }
    `,
    children: [
      {
        path: "",
        layout: "LogoOnly",
        getComponent: () => InvoiceDetailRoute,
        onPreloadJS: () => {
          InvoiceDetailRoute.preload()
        },
        query: graphql`
          query invoiceRoutes_InvoiceDetailQuery($token: String!) {
            invoice(token: $token) {
              ...InvoiceDetailRoute_invoice
            }
          }
        `,
        cacheConfig: { force: true },
      },

      {
        path: "payment",
        layout: "LogoOnly",
        getComponent: () => InvoicePaymentRoute,
        onPreloadJS: () => {
          InvoicePaymentRoute.preload()
        },
        query: graphql`
          query invoiceRoutes_InvoicePaymentQuery($token: String!) {
            invoice(token: $token) {
              ...InvoicePaymentRoute_invoice
            }
          }
        `,
        cacheConfig: { force: true },
      },
    ],
  },
]
