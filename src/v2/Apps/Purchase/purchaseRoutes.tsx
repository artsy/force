import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/Artsy/Router/Route"

const PurchasesApp = loadable(() => import("./PurchaseApp"), {
  resolveComponent: component => component.PurchaseAppFragmentContainer,
})

export const purchaseRoutes: AppRouteConfig[] = [
  {
    path: "/user/purchases",
    getComponent: () => PurchasesApp,
    prepare: () => {
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
