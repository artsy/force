import loadable from "@loadable/component"
import { graphql } from "react-relay"

const PaymentApp = loadable(() => import("./Routes/Payment/PaymentApp"), {
  resolveComponent: component => component.PaymentAppFragmentContainer,
})

export const paymentRoutes = [
  {
    // TODO: update route to /user/payments and remove stitched route to launch
    path: "/user/payments2",
    getComponent: () => PaymentApp,
    prepare: () => {
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
