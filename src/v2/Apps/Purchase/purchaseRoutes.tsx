import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const PurchasesApp = loadable(
  () => import(/* webpackChunkName: "pruchaseBundle" */ "./PurchaseApp"),
  {
    resolveComponent: component => component.PurchaseAppFragmentContainer,
  }
)

export const purchaseRoutes: AppRouteConfig[] = [
  {
    path: "/user/purchases",
    getComponent: () => PurchasesApp,
    onClientSideRender: () => {
      PurchasesApp.preload()
    },
    query: graphql`
      query purchaseRoutes_PurchaseQuery {
        me {
          ...PurchaseApp_me
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
