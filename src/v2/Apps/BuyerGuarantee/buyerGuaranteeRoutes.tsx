import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const BuyerGuaranteeApp = loadable(() => import("./BuyerGuaranteeApp"), {
  resolveComponent: component => component.BuyerGuaranteeApp,
})

const BuyerGuaranteeIndexRoute = loadable(
  () => import("./Routes/BuyerGuaranteeIndex"),
  {
    resolveComponent: component =>
      component.BuyerGuaranteeIndexFragmentContainer,
  }
)

export const buyerGuaranteeRoutes: RouteConfig[] = [
  {
    path: "/buyer-guarantee",
    getComponent: () => BuyerGuaranteeApp,
    prepare: () => {
      BuyerGuaranteeApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => BuyerGuaranteeIndexRoute,
        prepare: () => {
          return BuyerGuaranteeIndexRoute.preload()
        },
        query: graphql`
          query buyerGuaranteeRoutes_BuyerGuaranteeQuery {
            headerImage: artwork(id: "5dd8084d257aaf000e4a0396") {
              ...BuyerGuaranteeIndex_headerImage
            }
            authenticityImage: artwork(id: "5fecdbfa19d5ae5bf95c1dd8") {
              ...BuyerGuaranteeIndex_authenticityImage
            }
            moneyBackGuaranteeImage: artwork(id: "5fce729a212bcf54e2551f21") {
              ...BuyerGuaranteeIndex_moneyBackGuaranteeImage
            }
            securePaymentImage: artwork(id: "580fb7cd2a893a65c100086a") {
              ...BuyerGuaranteeIndex_securePaymentImage
            }
          }
        `,
      },
    ],
  },
]
