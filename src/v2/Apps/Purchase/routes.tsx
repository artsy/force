import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    getComponent: () => loadable(() => import("./PurchaseApp")),
    query: graphql`
      query routes_PurchaseQuery {
        me {
          ...PurchaseApp_me
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 10,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
