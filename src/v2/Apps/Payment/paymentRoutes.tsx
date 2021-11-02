import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const PaymentApp = loadable(
  () =>
    import(
      /* webpackChunkName: "paymentBundle" */ "./Routes/Payment/PaymentApp"
    ),
  {
    resolveComponent: component => component.PaymentAppFragmentContainer,
  }
)

export const paymentRoutes: AppRouteConfig[] = [
  {
    // TODO: update route to /user/payments and remove stitched route to launch
    path: "/user/payments",
    getComponent: () => PaymentApp,
    onClientSideRender: () => {
      PaymentApp.preload()
    },
    query: graphql`
      query paymentRoutes_PaymentQuery {
        me {
          ...PaymentApp_me
        }
      }
    `,
  },
]
